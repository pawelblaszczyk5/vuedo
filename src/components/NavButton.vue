<script lang="ts" setup>
	const { primary = true } = defineProps<{
		primary?: boolean;
	}>();
</script>

<template>
	<button
		class="border-2 border-emerald-400 py-2 text-sm focus-visible:border-fuchsia-400 focus-visible:outline-none"
		:class="{
			'bg-emerald-400 text-zinc-800': primary,
			'bg-zinc-800 text-zinc-200 ': !primary,
		}"
	>
		<slot />
	</button>
</template>
