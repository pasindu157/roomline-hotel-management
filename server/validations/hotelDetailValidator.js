// server/validations/hotelDetailValidator.js

export const hotelDetailValidate = (toValidateData) => {
  const errors = [];

  // 1. Name Validation (only if name is present)
  if (toValidateData.name !== undefined) {
    const name = toValidateData.name?.trim() || "";
    if (name.length < 3) {
      errors.push("Name must contain more than 3 characters");
    } else if (name.length > 15) {
      errors.push("Name cannot have more than 15 characters");
    }
  }

  // 2. Email Validation (only if email is present)
  if (toValidateData.email !== undefined) {
    const email = toValidateData.email?.trim() || "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Invalid email format");
    }
  }

  // 3. Phone Validation (only if phone is present)
  if (toValidateData.phone !== undefined) {
    const phone = toValidateData.phone?.trim() || "";
    if (phone.length !== 10) {
      errors.push("Phone number must have 10 numbers");
    }
  }

  // 4. Description Validation (only if description is present)
  if (toValidateData.description !== undefined) {
    const description = toValidateData.description?.trim() || "";
    if (description.length < 5) {
      errors.push("Description must contain more than 5 characters");
    } else if (description.length > 2000) {
      errors.push("Description cannot have more than 2000 characters");
    }
  }

  return errors;
};
