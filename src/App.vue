<script setup lang="ts">
	import { watch } from 'vue';

	const count = $ref(0);

	watch($$(count), value => {
		console.log(value);
	});
</script>

<template>
	<h1>Hello world</h1>
	<h2>Count is: {{ count }}</h2>
	<button @click="count++">Increase</button>
</template>
