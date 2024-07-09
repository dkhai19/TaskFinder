export type ITask = {
  taskId: string
  userId: string
  taskName: string
  taskDescription: string
  location: {
    latitude: number
    longtitude: number
  }
  startDate: string
  endDate: string
  status: string
}
