import { useFormik } from 'formik'
import { Board } from '@/types/board'
import { toast } from 'react-toastify'
import { useEffect, useMemo, useState } from 'react'
import { validationSchema } from '../validation'
import { OptionSelectType } from '@/components/Select'
import { boardService } from '@/services/board/board-service'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { taskStatusService } from '@/services/task-status/task-status-service'

const initialValues = {
  title: '',
  description: '',
}

type FormValues = typeof initialValues

type Params = {
  board: Board | null
  onSuccess?: () => void
}

export const useBoardFormDialog = (params: Partial<Params> = {}) => {
  const queryClient = useQueryClient()

  const [taskStatusIds, setTaskStatusIds] = useState<number[]>([])
  const [currentTaskStatusId, setCurrentTaskStatusId] = useState(0)

  useEffect(() => {
    if (params.board?.taskStatusList?.length) {
      const ids = params.board.taskStatusList.map(({ id }) => id)
      setTaskStatusIds(ids)
    }
  }, [params.board?.taskStatusList])

  const formik = useFormik({
    initialValues: {
      title: params.board?.title ?? initialValues.title,
      description: params.board?.description ?? initialValues.description,
    },
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
      await boardService.updateOrCreate(
        {
          title: values.title,
          description: description?.length ? description : null,
          taskStatusIds,
        },
        params.board?.id
      )

      queryClient.invalidateQueries({
        queryKey: ['list-boards'],
      })
      formik.resetForm()
      setTaskStatusIds([])
      params.onSuccess?.()
      toast.success('Quadro salvo com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar quadro')
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
