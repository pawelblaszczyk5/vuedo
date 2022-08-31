<script lang="ts" setup>
	let todoText = $ref('');

	const handleSubmit = () => {
		const trimmedTodoText = todoText.trim();

		if (!trimmedTodoText) return;

		todoText = '';
	};
</script>

<template>
	<form
		class="flex w-full max-w-xs flex-col"
		novalidate
		@submit.prevent="handleSubmit"
	>
		<label
			for="todo-text"
			class="pb-1 text-sm"
			>Todo text</label
		>
		<div class="flex">
			<input
				id="todo-text"
				v-model="todoText"
				class="w-full border-2 border-emerald-400 bg-zinc-800 p-2 text-sm focus-visible:border-fuchsia-400 focus-visible:outline-none"
				name="todo-text"
				type="text"
				required
			/>
			<button
				class="bg-emerald-400 px-6 text-zinc-800 ring-inset ring-fuchsia-400 focus-visible:outline-none focus-visible:ring-2"
			>
				Add
			</button>
		</div>
	</form>
</template>
