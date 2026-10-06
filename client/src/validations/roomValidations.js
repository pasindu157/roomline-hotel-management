export const noOfBedsValidate = (value, setNoOfBedsError) => {
  if (Number(value) > 3) {
    setNoOfBedsError("max bed capacity : 3");
    return false;
  } else if (isNaN(value) || value.trim() === "") {
    setNoOfBedsError("must be a valid number");
    return false;
  } else if (Number(value) <= 0) {
    setNoOfBedsError("must be greater than zero");
  } else {
    setNoOfBedsError("");
    return true;
  }
};

export const priceValidate = (value, setPricePerNightError) => {
  if (isNaN(value) || value.trim() === "") {
    setPricePerNightError("must be a valid number");
    return false;
  } else if (Number(value) <= 0) {
    setPricePerNightError("must be greater than zero");
    return false;
  } else {
    setPricePerNightError("");
    return true;
  }
};

export const adutlsValidate = (value, setAdultsError) => {
  if (isNaN(value) || value.trim() === "") {
    setAdultsError("must be a valid number");
    return false;
  } else if (Number(value) < 0) {
    setAdultsError("cannot be negative");
    return false;
  } else {
    setAdultsError("");
    return true;
  }
};

export const childValidate = (value, setChildrenError) => {
  if (isNaN(value) || value.trim() === "") {
    setChildrenError("must be a valid number");
    return false;
  } else if (Number(value) < 0) {
    setChildrenError("cannot be negative");
    return false;
  } else {
    setChildrenError("");
    return true;
  }
};

export const adultChildCountValidate = (
  adult,
  child,
  setAdult_childrenCountError,
) => {
  const sum = Number(adult) + Number(child);

  if (sum > 9) {
    setAdult_childrenCountError("Max capacity : 9");
    return false;
  } else {
    setAdult_childrenCountError("");
    return true;
  }
};

export const descriptionValidate = (value, setDescriptionError) => {
  if (value.length > 2000) {
    setDescriptionError("Max characters : 2000");
    return false;
  } else {
    setDescriptionError("");
    return true;
  }
};
