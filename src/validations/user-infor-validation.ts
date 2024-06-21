const emailRegex = /^[^\s@]{6,}@gmail\.com$/;

export const validateEmail = (email: string) => {
  return emailRegex.test(email);
};

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validatePassword = (password: string) => {
  return passwordRegex.test(password);
};
