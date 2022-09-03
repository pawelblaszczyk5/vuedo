<script lang="ts" setup>
	import type { Todo } from '~/utils/todoStore';

	const { todo } = defineProps<{ todo: Todo }>();

	const changeStatusButtonAriaLabel = $computed(
		() =>
			`Mark todo as ${
				todo.status === 'completed' ? 'uncompleted' : 'completed'
			}`,
	);
</script>

<template>
	<li class="b-2 flex items-center gap-1 border-emerald-400 py-2 px-3">
		<span class="block w-full truncate">{{ todo.text }}</span>
		<button
			:aria-label="changeStatusButtonAriaLabel"
			class="i-bi-check w-8 text-emerald-400"
			:class="{
				'i-bi-slash-circle text-lg': todo.status === 'completed',
				'i-bi-check text-2xl': todo.status === 'uncompleted',
			}"
		/>
		<button
			aria-label="Remove todo"
			class="i-bi-x w-8 text-2xl text-emerald-400"
		/>
	</li>
</template>
