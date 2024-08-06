import { Input } from '@/entities/Input';
import * as InputHandler from '@/utils/inputHandler';
import { validateEmail } from '@/utils/validateEmail';
import { validatePhone } from '@/utils/validatePhone';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';

const phone = Input.factory({
	validateCallback(value) {
		return validatePhone(value);
	},
	mask: InputHandler.maskTel,
	label: 'Telefone',
	name: 'phone',
	type: 'tel',
	required: true,
});

const formSteps = [
	{
		title: 'Seja bem vindo(a)',
		fields: [
			Input.factory({
				validateCallback(value) {
					return validateEmail(value);
				},
				label: 'Endereço de e-mail',
				name: 'email',
				type: 'email',
				required: true,
			}),
		],
	},
	{
		pf: {
			title: 'Pessoa Física',
			fields: [
				Input.factory({
					validateCallback(value) {
						return value.length >= 3 && value.includes(' ');
					},
					onBeforeInput(event) {
						const data = event.data;

						if (!data) return;

						if (!/[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]/.test(data))
							event.preventDefault();
					},
					label: 'Nome',
					name: 'name',
					required: true,
				}),
				Input.factory({
					validateCallback(value) {
						return cpfValidator.isValid(value);
					},
					mask: InputHandler.maskCpf,
					label: 'CPF',
					name: 'cpf',
					required: true,
				}),
				Input.factory({
					validateCallback(value) {
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
			],
		},
		pj: {
			title: 'Pessoa Jurídica',
			fields: [
				Input.factory({
					validateCallback(value) {
						return value.length >= 3 && value.includes(' ');
					},
					onBeforeInput(event) {
						const data = event.data;

						if (!data) return;

						if (!/[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]/.test(data))
							event.preventDefault();
					},
					label: 'Razão social',
					name: 'socialReason',
					required: true,
				}),
				Input.factory({
					validateCallback(value) {
						return cnpjValidator.isValid(value);
					},
					mask: InputHandler.maskCnpj,
					label: 'CNPJ',
					name: 'cnpj',
					required: true,
				}),
				Input.factory({
					validateCallback(value) {
						return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(
							value,
						);
					},
					label: 'Data de abertura',
					mask: InputHandler.maskDate,
					name: 'openedAt',
					required: true,
				}),
				phone,
			],
		},
	},
	{
		title: 'Senha de acesso',
		fields: [
			Input.factory({
				validateCallback(value) {
					return value.length >= 8;
				},
				label: 'Sua senha',
				name: 'password',
				type: 'password',
				required: true,
			}),
		],
	},
	{
		title: 'Revise suas informações',
		fields: [
			Input.factory({
				validateCallback(value) {
					return validateEmail(value);
				},
				label: 'Endereço de e-mail',
				name: 'email',
				type: 'email',
				required: true,
				readonly: true,
			}),
			Input.factory({
				validateCallback(value) {
					return validatePhone(value);
				},
				label: 'Nome completo',
				name: 'name',
				required: true,
				readonly: true,
				class: 'pf',
			}),
			Input.factory({
				validateCallback(value) {
					return validatePhone(value);
				},
				label: 'CPF',
				name: 'cpf',
				required: true,
				readonly: true,
				class: 'pf',
			}),
			Input.factory({
				validateCallback(value) {
					return validatePhone(value);
				},
				label: 'Data de nascimento',
				name: 'birthday',
				type: 'text',
				required: true,
				readonly: true,
				class: 'pf',
			}),
			Input.factory({
				validateCallback(value) {
					return validatePhone(value);
				},
				label: 'Razão social',
				name: 'socialReason',
				required: true,
				readonly: true,
				class: 'pj',
			}),
			Input.factory({
				validateCallback(value) {
					return validatePhone(value);
				},
				label: 'CNPJ',
				name: 'cnpj',
				required: true,
				readonly: true,
				class: 'pj',
			}),
			Input.factory({
				validateCallback(value) {
					return validatePhone(value);
				},
				label: 'Data de abertura',
				name: 'openedAt',
				type: 'text',
				required: true,
				readonly: true,
				class: 'pj',
			}),
			Input.factory({
				validateCallback(value) {
					return validatePhone(value);
				},
				label: 'Telefone',
				name: 'phone',
				type: 'tel',
				required: true,
				readonly: true,
			}),
			Input.factory({
				validateCallback(value) {
					return validatePhone(value);
				},
				label: 'Senha',
				name: 'password',
				type: 'password',
				required: true,
				readonly: true,
			}),
		],
	},
];

export { formSteps };
