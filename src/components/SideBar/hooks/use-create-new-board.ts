import { OptionSelectType } from '@/components/Select'
import { boardService } from '@/services/board/board-service'
import { taskStatusService } from '@/services/task-status/task-status-service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { validationSchema } from '../components/CreateNewBoard/validation'
import { toFormikValidationSchema } from 'zod-formik-adapter'

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

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: (values) => handleSubmit(values),
  })

  const handleSubmit = async (values: FormValues) => {
    try {
      if (!taskStatusIds.length) {
        toast.warn('Adicione um status')
        return null
      }

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
      toast.success('Quadro cadastrado com sucesso!')
    } catch (error) {
      toast.error('Erro ao cadastrar quadro')
    }
  }

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
      toast.warn('selecione um status')
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
