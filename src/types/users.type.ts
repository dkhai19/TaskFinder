export type IUsers = {
  uid?: string
  email?: string
  password?: string
  phone?: string
  gender?: boolean
  birthday?: string
  first_name?: string
  last_name?: string
  rating?: number
  role?: string
}

export type IUserProfiles = {
  uid?: string
  email?: string
  phone?: string
  gender?: string
  birthday?: string
  first_name?: string
  last_name?: string
}

export type IUserAddtionalInfor = {
  first_name: string
  last_name: string
  birthday: Date
  identity: string
}

export type IPayloadUser = {
  user_id: string | undefined
  name: string | undefined
}
