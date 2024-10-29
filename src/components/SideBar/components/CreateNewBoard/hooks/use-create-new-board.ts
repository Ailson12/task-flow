import { OptionSelectType } from '@/components/Select'
import { taskStatusService } from '@/services/task-status/task-status-service'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

export const useCreateNewBoard = () => {
  const [open, setOpen] = useState(false)

  const { data: taskStatusList, isLoading } = useQuery({
    queryKey: ['list-task-status'],
    queryFn: taskStatusService.findAll,
  })

  const taskStatusOptions = useMemo(() => {
    return (taskStatusList ?? [])?.map<OptionSelectType>((taskStatus) => ({
      label: taskStatus.title,
      value: taskStatus.id,
    }))
  }, [taskStatusList])

  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  return {
    open,
    onOpen,
    onClose,
    taskStatus: {
      isLoading,
      options: taskStatusOptions,
    },
  }
}
