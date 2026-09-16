export const hotelDetailValidate = (toValidateData) => {
  const errors = [];

  if (toValidateData.name.length < 3) {
    errors.push("Name must contain more than 3 characters");
  }
  if (toValidateData.name.length > 15) {
    errors.push("Name cannot have more than 15 characters");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toValidateData.email)) {
    errors.push("Invalid email format");
  }
  if (toValidateData.phone.length !== 10) {
    errors.push("Phone number must have 10 numbers");
  }
  if (toValidateData.description.length < 5) {
    errors.push("Description must contain more than 5 characters");
  }
  if (toValidateData.description.length > 100) {
    errors.push("Description cannot have more than 100 characters");
  }
  return errors;
};
