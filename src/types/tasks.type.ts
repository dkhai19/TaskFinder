export type ITask = {
  taskId?: string
  userId?: string
  taskName?: string
  taskDescription?: string
  location: {
    latitude: number
    longtitude: number
  }
  startDate?: Date
  endDate?: Date
  status?: string
}
