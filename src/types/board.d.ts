import { TaskStatus } from './task-status'

export interface Board {
  id: number
  title: string
  description?: string
  taskStatusList: TaskStatus[]
}
