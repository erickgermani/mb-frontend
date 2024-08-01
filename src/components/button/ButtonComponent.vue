<script setup>
defineProps(['text', 'onClick', 'disabled']);
</script>

<style lang="scss">
@import '_input.styles';
</style>

<template>
	<div class="button">
		<button @click="onClick" :disabled="disabled">{{ text }}</button>
	</div>
</template>
