import { useFormik } from 'formik'
import { validationSchema } from '../validation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { boardService } from '@/services/board/board-service'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { toast } from 'react-toastify'
import { useMemo, useState } from 'react'
import { taskStatusService } from '@/services/task-status/task-status-service'
import { OptionSelectType } from '@/components/Select'

const initialValues = {
  title: '',
  description: '',
}

type FormValues = typeof initialValues

export const useBoardFormDialog = () => {
  const queryClient = useQueryClient()

  const [taskStatusIds, setTaskStatusIds] = useState<number[]>([])
  const [currentTaskStatusId, setCurrentTaskStatusId] = useState(0)

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: (values) => handleSubmit(values),
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
      // onClose()
      toast.success('Quadro cadastrado com sucesso!')
    } catch (error) {
      toast.error('Erro ao cadastrar quadro')
    }
  }

  return {
    formik,
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
