import { useFormik } from 'formik'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { OptionSelectType } from '@/components/Select'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { validationSchema } from '../components/AddNewTask/validation'
import { taskStatusService } from '@/services/task-status/task-status-service'
import { useBoardStore } from '@/store/board.store'

const initialValues = {
  title: '',
  description: '',
  taskStatusId: '',
}

type FormValues = typeof initialValues

export const useAddNewTask = () => {
  const { boardSelected } = useBoardStore()
  const [currentTaskStatusId, setCurrentTaskStatusId] = useState(0)

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: (values) => handleSubmit(values),
  })

  const handleSubmit = (values: FormValues) => {
    console.log('values: ', values)
  }

  const { data: taskStatusList } = useQuery({
    queryKey: ['list-task-status', boardSelected],
    queryFn: () =>
      taskStatusService.findAllByBoard({
        boardId: boardSelected?.id ?? 0,
      }),
    enabled: Boolean(boardSelected?.id),
  })

  const taskStatusOptions = useMemo(() => {
    return (taskStatusList ?? [])?.map<OptionSelectType>((taskStatus) => ({
      label: taskStatus.title,
      value: taskStatus.id,
    }))
  }, [taskStatusList])

  return {
    formik,
    taskStatus: {
      options: taskStatusOptions,
      value: currentTaskStatusId,
      onChange: setCurrentTaskStatusId,
    },
  }
}
