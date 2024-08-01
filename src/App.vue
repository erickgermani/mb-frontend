<script setup>
import InputComponent from './components/input/InputComponent.vue';
import ButtonComponent from './components/button/ButtonComponent.vue';

import { ref } from 'vue';
import { formSteps } from './config/form-steps';

const step = ref(0);

const loading = ref(false);

const invalid = ref(false);

function next(currentStep) {
	if (currentStep >= 3) return;

	step.value = step.value + 1;
}

function prev(currentStep) {
	if (step.value === 0 || currentStep === 0) return;

	step.value = step.value - 1;
}

function validate(currentStep) {
	loading.value = true;

	let isInvalid = false;

	for (const field of formSteps[currentStep].fields) {
		if (!field.value) continue;

		const invalidField = field.validate();

		isInvalid = isInvalid || invalidField;
	}

	invalid.value = isInvalid;

	loading.value = false;
}
</script>

<template>
	<main>
		<div
			:style="{
				display: !step ? 'block' : 'none',
			}"
		>
			<h1>
				{{ formSteps[0].title }}
			</h1>
			<form>
				<div v-for="(input, ind) of formSteps[0].fields" :key="ind">
					<InputComponent :input="input" :validate="validate" />
				</div>
				<div>
					<ButtonComponent text="Continuar" :onClick="next" />
				</div>
			</form>
		</div>
		<div
			:style="{
				display: step === 1 ? 'block' : 'none',
			}"
		>
			<h1>
				{{ formSteps[1].title }}
			</h1>
			<form>
				<div v-for="(input, ind) of formSteps[0].fields" :key="ind">
					<InputComponent :input="input" :validate="validate" />
				</div>
				<div>
					<ButtonComponent text="Continuar" :onClick="next" />
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
			<form>
				<div v-for="(input, ind) of formSteps[0].fields" :key="ind">
					<InputComponent :input="input" :validate="validate" />
				</div>
				<div>
					<ButtonComponent text="Continuar" :onClick="next" />
				</div>
			</form>
		</div>
		<div
			:style="{
				display: step === 3 ? 'block' : 'none',
			}"
		>
			<h1>
				{{ formSteps[3].title }}
			</h1>
			<form>
				<div v-for="(input, ind) of formSteps[0].fields" :key="ind">
					<InputComponent :input="input" :validate="validate" />
				</div>
				<div>
					<ButtonComponent text="Continuar" :onClick="next" />
				</div>
			</form>
		</div>
	</main>
</template>
