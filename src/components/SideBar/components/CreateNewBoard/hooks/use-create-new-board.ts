import { OptionSelectType } from '@/components/Select'
import { boardService } from '@/services/board/board-service'
import { taskStatusService } from '@/services/task-status/task-status-service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useMemo, useState } from 'react'

const initialValues = {
  title: '',
  description: '',
}

type FormValues = typeof initialValues

export const useCreateNewBoard = () => {
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [taskStatusIds, setTaskStatusIds] = useState<number[]>([])
  const [currentTaskStatusId, setCurrentTaskStatusId] = useState(0)

  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  const handleSubmit = async (values: FormValues) => {
    try {
      const { description } = values
      await boardService.create({
        title: values.title,
        description: description?.length ? description : null,
        taskStatusIds,
      })

      queryClient.invalidateQueries({
        queryKey: ['list-boards'],
      })
      formik.resetForm()
      setTaskStatusIds([])
      onClose()
      window.alert('Quadro cadastrado com sucesso!')
    } catch (error) {
      window.alert('Erro ao cadastrar quadro')
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit(values) {
      handleSubmit(values)
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
