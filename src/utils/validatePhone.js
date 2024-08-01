function validatePhone(value) {
  const phone = value.replace(/\D/g, '');

  if (phone.length < 11) return false;

  return true;
}

export { validatePhone };
