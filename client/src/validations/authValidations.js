export const validateName = (value, setNameError) => {
  if (value.length < 4) {
    setNameError("Min. 4 characters");
  } else if (value === "") {
    setNameError("required");
  } else if (value.length > 15) {
    setNameError("Max. 15 characters");
  } else {
    setNameError("");
    return true;
  }
};

export const validateEmail = (value, setEmailError) => {
  const trimmed = value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmed) {
    setEmailError("required");
  } else if (!emailRegex.test(trimmed)) {
    setEmailError("Invalid email format");
  } else {
    setEmailError("");
    return true;
  }
};

export const validatePhone = (value, setPhoneError) => {
  const trimmed = value.trim();

  if (!trimmed) {
    setPhoneError("required");
  } else if (!/^\d{10}$/.test(trimmed)) {
    setPhoneError("must be 10 digits");
  } else {
    setPhoneError("");
    return true;
  }
};

// export const validatePassword = (value, setPasswordError) => {
//   const trimmed = value.trim();
//   const passwordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

//   if (!trimmed) {
//     setPasswordError("password is required");
//   } else if (!passwordRegex.test(trimmed)) {
//     setPasswordError("");
//   }
// };

export const validateConfrimPassword = (
  password,
  confirmPass,
  setConfrimPasswordError,
) => {
  const trimmedPassword = password.trim();
  const trimmedConfirmPass = confirmPass.trim();

  if (!trimmedConfirmPass) {
    setConfrimPasswordError("required");
  } else if (trimmedPassword !== trimmedConfirmPass) {
    setConfrimPasswordError("Passwords don't match");
  } else {
    setConfrimPasswordError("");
    return true;
  }
};
