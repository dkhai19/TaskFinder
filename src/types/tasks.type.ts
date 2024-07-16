export type ITask = {
  taskId: string
  userId: string
  taskName: string
  taskDescription: string
  location: {
    latitude: number
    longtitude: number
  }
  start_date: string
  end_date: string
  status: string
}
