<script setup>
defineProps(['text', 'onClick', 'disabled', 'type']);
</script>

<style lang="scss">
@import '_button.styles';
</style>

<template>
	<div class="button" :class="type === 'submit' ? 'submit' : ''">
		<button @click="onClick" :disabled="disabled" :type="type ?? 'button'">
			{{ text }}
		</button>
	</div>
</template>
