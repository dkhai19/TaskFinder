const emailRegex = /^[^\s@]{6,}@gmail\.com$/

export const validateEmail = (email: string) => {
  return emailRegex.test(email)
}

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const validatePassword = (password: string) => {
  return passwordRegex.test(password)
}

export const validateConfirmPassword = (pwd1: string, cfPwd: string) => {
  return pwd1 === cfPwd
}

const phoneRegex = /^(0[35789])[0-9]{8}$/
export const validatePhone = (phone: string) => {
  return phoneRegex.test(phone)
}

export const parseDateOfBirth = (dobString: string) => {
  const date = new Date(dobString)
  if (isNaN(date.getTime())) {
    // If date is invalid, return null or handle the error as needed
    return null
  }
  return date
}
