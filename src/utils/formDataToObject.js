function formDataToObject(formData) {
	const object = {};

	formData.forEach((value, key) => {
		if (value) object[key] = value.toString();
	});

	return object;
}

export { formDataToObject };
