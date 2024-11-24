import { useMemo } from 'react'
import { useFormik } from 'formik'
import { Task } from '@/types/task'
import { toast } from 'react-toastify'
import { useBoardStore } from '@/store/board.store'
import { OptionSelectType } from '@/components/Select'
import { taskService } from '@/services/task/task-service'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { validationSchema } from '../components/AddNewTask/validation'
import { taskStatusService } from '@/services/task-status/task-status-service'

const initialValues = {
  title: '',
  description: '',
  taskStatusId: '',
}

type FormValues = typeof initialValues

type Params = {
  onClose: () => void
  task: Task | null
}

export const useAddNewTask = (params: Partial<Params> = {}) => {
  const queryClient = useQueryClient()
  const { boardSelected } = useBoardStore()

  const formik = useFormik({
    initialValues: {
      title: params.task?.title ?? initialValues.title,
      description: params.task?.description ?? initialValues.description,
      taskStatusId:
        String(params.task?.taskStatus?.id) ?? initialValues.taskStatusId,
    },
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: (values) => handleSubmit(values),
  })

  const handleSubmit = async (values: FormValues) => {
    try {
      await taskService.updateOrCreate(
        {
          title: values.title,
          description: values.description,
          taskStatusId: Number(values.taskStatusId),
          boardId: boardSelected?.id ?? 0,
        },
        params.task?.id
      )

      params.onClose?.()
      formik.resetForm()
      queryClient.invalidateQueries({
        queryKey: ['list-tasks'],
      })
      toast.success('Atividade salva com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar atividade')
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
