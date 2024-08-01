function formDataToObject(formData) {
  const object = {};

  formData.forEach((value, key) => {
    object[key] = value.toString();
  });

  return object;
}

export { formDataToObject };
