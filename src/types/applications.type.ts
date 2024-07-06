export type IApplication = {
  application_date: Date
  status: string
  task_id: string
  user_id?: string
  first_name?: string
  last_name?: string
  rating?: number
}

export interface IApplied extends IApplication {
  isApplied: boolean
}
