import { Input } from '@/entities/Input';
import * as InputHandler from '@/utils/inputHandler';
import { validateEmail } from '@/utils/validateEmail';
import { validatePhone } from '@/utils/validatePhone';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';

const phone = Input.factory({
  async validateCallback(value) {
    return validatePhone(value);
  },
  mask: InputHandler.maskTel,
  label: 'Telefone',
  name: 'phone',
  type: 'tel',
  required: true,
});

const getStepTwo = (personType) => {
  if (personType === 'pf') {
    return [
      Input.factory({
        async validateCallback(value) {
          return value.length >= 3 && value.includes(' ');
        },
        onBeforeInput(event) {
          const data = event.data;

          if (!data) return;

          if (!/[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]/.test(data))
            event.preventDefault();
        },
        label: 'Nome completo',
        name: 'name',
        required: true,
      }),
      Input.factory({
        async validateCallback(value) {
          return cpfValidator.isValid(value);
        },
        mask: InputHandler.maskCpf,
        label: 'CPF',
        name: 'cpf',
        required: true,
      }),
      Input.factory({
        async validateCallback(value) {
          return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(
            value,
          );
        },
        label: 'Data de nascimento',
        name: 'birthday',
        mask: InputHandler.maskDate,
        required: true,
      }),
      phone,
    ];
  }

  return [
    Input.factory({
      async validateCallback(value) {
        return value.length >= 3 && value.includes(' ');
      },
      onBeforeInput(event) {
        const data = event.data;

        if (!data) return;

        if (!/[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]/.test(data))
          event.preventDefault();
      },
      label: 'Razão Social',
      name: 'razao-social',
      required: true,
    }),
    Input.factory({
      async validateCallback(value) {
        return cnpjValidator.isValid(value);
      },
      mask: InputHandler.maskCnpj,
      label: 'CNPJ',
      name: 'cnpj',
      required: true,
    }),
    Input.factory({
      async validateCallback(value) {
        return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value);
      },
      label: 'Data de abertura',
      mask: InputHandler.maskDate,
      name: 'opening-date',
      required: true,
    }),
    phone,
  ];
};

const formSteps = [
  {
    title: 'Seja bem vindo(a)',
    fields: [
      Input.factory({
        async validateCallback(value) {
          return validateEmail(value);
        },
        label: 'E-mail',
        name: 'email',
        type: 'email',
        required: true,
      }),
    ],
  },
  getStepTwo,
  {
    title: 'Senha de acesso',
    fields: [
      Input.factory({
        async validateCallback(value) {
          return value.length >= 6;
        },
        label: 'Sua senha',
        name: 'email',
        type: 'email',
        required: true,
      }),
    ],
  },
];

export { formSteps };
