function maskCpf(evt) {
  const target = evt.target;

  const cpf = target.value.replace(/\D/g, '');

  let formattedCpf = '';

  if (!cpf.length) formattedCpf = '';
  else if (cpf.length <= 3) formattedCpf = cpf;
  else if (cpf.length <= 6) formattedCpf = `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
  else if (cpf.length <= 9)
    formattedCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
  else
    formattedCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;

  target.value = formattedCpf;
}

function maskCnpj(evt) {
  const target = evt.target;

  const cnpj = target.value.replace(/\D/g, '');

  let formattedCnpj = '';

  if (!cnpj.length) formattedCnpj = '';
  else if (cnpj.length <= 2) formattedCnpj = cnpj;
  else if (cnpj.length <= 5)
    formattedCnpj = `${cnpj.slice(0, 2)}.${cnpj.slice(2)}`;
  else if (cnpj.length <= 8)
    formattedCnpj = `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5)}`;
  else if (cnpj.length <= 12)
    formattedCnpj = `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8)}`;
  else
    formattedCnpj = `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;

  target.value = formattedCnpj;
}

function maskRg(evt) {
  const target = evt.target;

  const formattedRg = target.value.replace(/[^0-9a-zA-Z]/g, '');

  target.value = formattedRg;
}

function maskDate(evt) {
  const target = evt.target;

  const date = target.value.replace(/\D/g, '');

  let formattedDate = '';

  if (!date.length) formattedDate = '';
  else if (date.length <= 2) formattedDate = date;
  else if (date.length <= 4)
    formattedDate = `${date.slice(0, 2)}/${date.slice(2)}`;
  else
    formattedDate = `${date.slice(0, 2)}/${date.slice(2, 4)}/${date.slice(4, 8)}`;

  target.value = formattedDate;
}

function maskTel(evt) {
  const target = evt.target;

  const phone = target.value.replace(/\D/g, '');

  let formattedPhone = '';

  if (!phone.length) formattedPhone = '';
  else if (phone.length <= 2) formattedPhone = `(${phone}`;
  else if (phone.length <= 6)
    formattedPhone = `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
  else if (phone.length <= 10)
    formattedPhone = `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
  else
    formattedPhone = `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;

  target.value = formattedPhone;
}

function maskZip(evt) {
  const target = evt.target;

  const zip = target.value.replace(/\D/g, '');

  let formattedZip = '';

  if (!zip.length) formattedZip = '';
  else if (zip.length <= 4) formattedZip = zip;
  else if (zip.length <= 5) formattedZip = `${zip.slice(0, 5)}`;
  else formattedZip = `${zip.slice(0, 5)}-${zip.slice(5, 8)}`;

  target.value = formattedZip;
}

export { maskCpf, maskCnpj, maskRg, maskDate, maskTel, maskZip };
