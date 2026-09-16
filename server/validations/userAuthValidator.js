const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

export const userValidator = (toValidateData) => {
  const errors = [];
  if (toValidateData.name.length < 4) {
    errors.push("Name must contain more than 4 characters");
  }
  if (toValidateData.name.length > 15) {
    errors.push("Name cannot have more than 15 characters");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toValidateData.email)) {
    errors.push("Invalid email format");
  }
  if (toValidateData.phone.length !== 10) {
    errors.push("Phone number must contain 10 digits");
  }
  if (!passwordRegex.test(toValidateData.password)) {
    errors.push(`password must contain 6 characters.
  must contain 1 simple letter
  must contain 1 capital letter
  must contain 1 number and 
  must contain 1 special character`);
  }
  if (toValidateData.password !== toValidateData.confirmPassword) {
    errors.push("Passwords do not match");
  }
  return errors;
};
