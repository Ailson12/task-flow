import { TaskStatus } from './task-status'

export interface Task {
  description: string
  order: number
  taskStatus: TaskStatus
  id: number
  title: string
  title: string
}

export interface TaskGrouped {
  id: string | number
  color: string
  status: TaskStatus
  tasks: Task[]
}
