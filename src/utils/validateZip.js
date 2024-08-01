function validateZip(value) {
  if (value.length !== 9) return false;

  return true;
}

export { validateZip };
