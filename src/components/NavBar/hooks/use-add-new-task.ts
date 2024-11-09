import { useFormik } from 'formik'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { OptionSelectType } from '@/components/Select'
import { taskStatusService } from '@/services/task-status/task-status-service'

export const useAddNewTask = () => {
  const [currentTaskStatusId, setCurrentTaskStatusId] = useState(0)

  const formik = useFormik({
    onSubmit: () => {
      //
    },
    initialValues: {
      title: '',
      description: '',
    },
  })

  const { data: taskStatusList } = useQuery({
    queryKey: ['list-task-status'],
    queryFn: taskStatusService.findAll,
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
