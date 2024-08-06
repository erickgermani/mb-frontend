<script setup>
import InputComponent from './components/input/InputComponent.vue';
import ButtonComponent from './components/button/ButtonComponent.vue';

import { ref, reactive, watch } from 'vue';
import { formSteps } from './config/form-steps';
import { formDataToObject } from './utils/formDataToObject';

const step = ref(0);

const maxSteps = 4;

const loading = ref(false);

const invalid = ref(false);

const selectedPersonType = ref('');

const stepOne = reactive(formSteps[0].fields);

const pfStepTwo = reactive(formSteps[1].pf.fields);

const pjStepTwo = reactive(formSteps[1].pj.fields);

const stepThree = reactive(formSteps[2].fields);

const stepFour = reactive(formSteps[3].fields);

watch(step, () => {
	if (step.value === 3) {
		stepFour[0].setValue(stepOne[0].value);
		stepFour[7].setValue(
			selectedPersonType.value === 'pf'
				? pfStepTwo[3].value
				: pjStepTwo[3].value,
		);
		stepFour[8].setValue(stepThree[0].value);

		if (selectedPersonType.value === 'pf') {
			stepFour[1].setValue(pfStepTwo[0].value);
			stepFour[2].setValue(pfStepTwo[1].value);
			stepFour[3].setValue(pfStepTwo[2].value);
		} else {
			stepFour[4].setValue(pjStepTwo[0].value);
			stepFour[5].setValue(pjStepTwo[1].value);
			stepFour[6].setValue(pjStepTwo[2].value);
		}
	}
});

function next(currentStep) {
	if (currentStep >= 3) return;

	step.value = step.value + 1;
}

function prev(currentStep) {
	if (step.value === 0 || currentStep === 0) return;

	step.value = step.value - 1;
}

function validate(fields) {
	loading.value = true;

	let isInvalid = false;

	for (const field of fields) {
		if (!field.value) {
			field.setInvalid(false);
			continue;
		}

		const invalidField = field.validate();

		if (invalidField) field.setInvalid(true);
		else field.setInvalid(false);

		isInvalid = isInvalid || invalidField;
	}

	invalid.value = isInvalid;

	loading.value = false;
}

async function handleSubmit(event) {
	const form = event.target;

	const formData = new FormData(form);

	const data = new formDataToObject(formData);

	data.personType = selectedPersonType.value;

	const headers = new Headers();

	headers.append('Content-Type', 'application/json');

	fetch('http://localhost:3000/registration', {
		method: 'POST',
		body: JSON.stringify(data),
		headers,
	})
		.then(async (response) => {
			if (!response.ok)
				throw new Error(
					await response.json().then((data) => {
						return data.error || 'Erro na solicitação';
					}),
				);

			return response.json();
		})
		.then((data) => {
			alert(data.message);
			form.reset();
		})
		.catch((error) => {
			console.log('error :>> ', error);
			alert(error);
		});
}
</script>

<template>
	<main>
		<p>
			Etapa <span style="color: var(--orange)"> {{ step + 1 }}</span> de
			{{ maxSteps }}
		</p>
		<div
			:style="{
				display: !step ? 'block' : 'none',
			}"
		>
			<h1>
				{{ formSteps[0].title }}
			</h1>
			<form @submit.prevent="next">
				<div v-for="(input, ind) of stepOne" :key="ind">
					<InputComponent
						:input="input"
						:validate="validate"
						:fields="stepOne"
					/>

					<div class="field row">
						<label>
							<input
								type="radio"
								name="personType"
								v-model="selectedPersonType"
								value="pf"
								required
							/>
							Pessoa Física
						</label>
						<label>
							<input
								type="radio"
								name="personType"
								v-model="selectedPersonType"
								value="pj"
								required
							/>
							Pessoa Jurídica
						</label>
					</div>
				</div>
				<div class="actions">
					<ButtonComponent text="Continuar" type="submit" />
				</div>
			</form>
		</div>
		<div
			:style="{
				display: step === 1 ? 'block' : 'none',
			}"
			v-if="selectedPersonType"
		>
			<h1>
				{{ formSteps[1][selectedPersonType].title }}
			</h1>
			<form @submit.prevent="next">
				<div
					v-for="(input, ind) of selectedPersonType === 'pf'
						? pfStepTwo
						: pjStepTwo"
					:key="ind"
				>
					<InputComponent
						:input="input"
						:validate="validate"
						:fields="selectedPersonType === 'pf' ? pfStepTwo : pjStepTwo"
					/>
				</div>
				<div class="actions row">
					<ButtonComponent text="Voltar" type="button" :on-click="prev" />
					<ButtonComponent text="Continuar" type="submit" />
				</div>
			</form>
		</div>
		<div
			:style="{
				display: step === 2 ? 'block' : 'none',
			}"
		>
			<h1>
				{{ formSteps[2].title }}
			</h1>
			<form @submit.prevent="next">
				<div v-for="(input, ind) of stepThree" :key="ind">
					<InputComponent
						:input="input"
						:validate="validate"
						:fields="stepThree"
					/>
				</div>
				<div class="actions row">
					<ButtonComponent text="Voltar" type="button" :on-click="prev" />
					<ButtonComponent text="Continuar" type="submit" />
				</div>
			</form>
		</div>
		<div
			:style="{
				display: step === 3 ? 'block' : 'none',
			}"
			v-if="step === 3"
			class="resume"
			:class="selectedPersonType"
		>
			<h1>
				{{ formSteps[3].title }}
			</h1>
			<form @submit.prevent="handleSubmit">
				<div v-for="(input, ind) of stepFour" :key="ind">
					<InputComponent :input="input" :validate="validate" />
				</div>
				<div class="actions row">
					<ButtonComponent text="Voltar" type="button" :on-click="prev" />
					<ButtonComponent text="Cadastrar" type="submit" />
				</div>
			</form>
		</div>
	</main>
</template>
