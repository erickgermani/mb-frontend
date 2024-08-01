const maskPhone = (phone) => {
  if (phone.startsWith('0800')) {
    phone = phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');

    return phone;
  }

  const size = phone.replace(/\D/g, '').length;
  phone = phone.replace(/\D/g, '');
  phone = phone.replace(/^(\d\d)(\d)/g, '($1) $2');
  phone =
    size > 10
      ? phone.replace(/(\d{5})(\d)/, '$1-$2')
      : phone.replace(/(\d{4})(\d)/, '$1-$2');

  return phone;
};

export { maskPhone };
