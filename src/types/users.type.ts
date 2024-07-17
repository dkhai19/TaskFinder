export type IUsers = {
  id: string
  avatar: string
  cover?: string
  email: string
  phone: string
  gender: string
  birthday: string
  first_name: string
  last_name: string
  rating?: number
  role?: string
  introduction: string
  fcmToken?: string
}

export type IUserProfiles = {
  id: string
  email: string
  avatar: string
  cover?: string
  phone: string
  gender: string
  birthday: string
  first_name: string
  last_name: string
  introduction: string
}

// export type IUserAddtionalInfor = {
//   first_name: string
//   last_name: string
//   birthday: Date
//   introduction: string
// }

export type IPayloadUser = {
  user_id: string | undefined
  name: string | undefined
}

export const mapUserProfileToUser = (profile: IUserProfiles): IUsers => ({
  id: profile.id,
  avatar: profile.avatar,
  first_name: profile.first_name,
  last_name: profile.last_name,
  birthday: profile.birthday,
  phone: profile.phone,
  gender: profile.gender,
  introduction: profile.introduction,
  email: profile.email,
})
