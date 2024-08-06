<script setup>
const props = defineProps(['input', 'validate', 'handleChange', 'fields']);

function handleBlur(evt) {
	const { value } = evt.target;

	props.input.setValue(value);

	props.validate(props.fields);
}
</script>

<style lang="scss" scoped>
@import '_input.styles';
</style>

<template>
	<div class="field" :class="`${input.class} ${input.invalid && 'error'}`">
		<div class="input" :class="input.disabled && 'disabled'">
			<label :for="input.name"
				>{{ input.label }} <span v-if="input.required">*</span></label
			>

			<input
				:id="input.name"
				:name="input.name"
				:placeholder="input.placeholder"
				:type="input.type"
				:autocomplete="input.autocomplete"
				:required="input.required"
				:maxlength="input.maxlength"
				:disabled="input.disabled"
				:readonly="input.readonly"
				:value="input.value"
				@input="input.mask"
				@blur="handleBlur"
				@change="(evt) => (handleChange ? handleChange(evt) : null)"
				@beforeinput="input.onBeforeInput"
			/>
		</div>
		<div class="field-error">
			<p>{{ input.label }} inválido.</p>
		</div>
	</div>
</template>
