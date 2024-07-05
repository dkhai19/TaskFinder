export type IApplication = {
  application_date: Date
  status: string
  task_id: string
  user_id: string
}

export interface IApplied extends IApplication {
  isApplied: boolean
}
