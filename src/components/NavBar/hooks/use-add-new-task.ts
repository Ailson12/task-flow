import { useMemo } from 'react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useBoardStore } from '@/store/board.store'
import { OptionSelectType } from '@/components/Select'
import { taskService } from '@/services/task/task-service'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { validationSchema } from '../components/AddNewTask/validation'
import { taskStatusService } from '@/services/task-status/task-status-service'

const initialValues = {
  title: '',
  description: '',
  taskStatusId: '',
}

type FormValues = typeof initialValues

type Params = {
  onClose?: () => void
}

export const useAddNewTask = (params: Params = {}) => {
  const queryClient = useQueryClient()
  const { boardSelected } = useBoardStore()

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: (values) => handleSubmit(values),
  })

  const handleSubmit = async (values: FormValues) => {
    try {
      await taskService.create({
        title: values.title,
        description: values.description,
        taskStatusId: Number(values.taskStatusId),
        boardId: boardSelected?.id ?? 0,
      })

      params.onClose?.()
      formik.resetForm()
      queryClient.invalidateQueries({
        queryKey: ['list-tasks'],
      })
      toast.success('Atividade cadastrada com sucesso!')
    } catch (error) {
      toast.error('Erro ao cadastrar atividade')
    }
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
    },
  }
}
