import { OptionSelectType } from '@/components/Select'
import { taskStatusService } from '@/services/task-status/task-status-service'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useMemo, useState } from 'react'

export const useCreateNewBoard = () => {
  const [open, setOpen] = useState(false)
  const [taskStatusIds, setTaskStatusIds] = useState<number[]>([])
  const [currentTaskStatusId, setCurrentTaskStatusId] = useState(0)

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit(values) {
      console.log('values: ', values)
    },
  })

  const { data: taskStatusList, isLoading } = useQuery({
    queryKey: ['list-task-status'],
    queryFn: taskStatusService.findAll,
  })

  const taskStatusOptions = useMemo(() => {
    const options: OptionSelectType[] = []

    taskStatusList?.forEach((taskStatus) => {
      if (!taskStatusIds.includes(taskStatus.id)) {
        options.push({
          label: taskStatus.title,
          value: taskStatus.id,
        })
      }
    })

    return options
  }, [taskStatusList, taskStatusIds])

  const taskStatusSelected = useMemo(() => {
    return (taskStatusList ?? []).filter((taskStatus) =>
      taskStatusIds.includes(taskStatus.id)
    )
  }, [taskStatusList, taskStatusIds])

  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  const addTaskStatus = () => {
    if (!currentTaskStatusId) {
      window.alert('selecione um status')
      return
    }

    const isSelected = taskStatusIds.includes(currentTaskStatusId)
    if (!isSelected) {
      setTaskStatusIds(taskStatusIds.concat(currentTaskStatusId))
      setCurrentTaskStatusId(0)
    }
  }

  const removeTaskStatus = (id: number) => {
    setTaskStatusIds(taskStatusIds.filter((value) => value !== id))
  }

  return {
    open,
    onOpen,
    onClose,
    formik,
    currentTaskStatusId,
    setCurrentTaskStatusId,
    taskStatus: {
      isLoading,
      addTaskStatus,
      removeTaskStatus,
      taskStatusSelected,
      value: currentTaskStatusId,
      options: taskStatusOptions,
      onChange: setCurrentTaskStatusId,
    },
  }
}
