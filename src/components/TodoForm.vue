<script lang="ts" setup>
	import { useTodoStore } from '~/utils/todoStore';

	const { createTodo, isTodoExistingAlready } = useTodoStore();

	let todoText = $ref('');
	let error = $ref('');
	let triedToSubmit = $ref(false);

	const hasError = $computed(() => Boolean(error));

	const handleTodoTextInput = (event: Event) => {
		const input = event.currentTarget as HTMLInputElement;

		todoText = input.value;

		validateTodoText();
	};

	const validateTodoText = () => {
		if (!hasError && !triedToSubmit) return;

		if (!todoText) {
			error = "Todo can't be empty";
			return;
		}

		if (isTodoExistingAlready(todoText)) {
			error = 'Todo exists already';
			return;
		}

		error = '';
	};

	const handleSubmit = () => {
		todoText = todoText.trim();
		triedToSubmit = true;
		validateTodoText();

		if (hasError) {
			return;
		}

		createTodo(todoText);
		todoText = '';
		triedToSubmit = false;
	};
</script>

<template>
	<form
		novalidate
		autocomplete="off"
		@submit.prevent="handleSubmit"
	>
		<label
			for="todo-text"
			class="block pb-1 text-sm"
			>Todo text</label
		>
		<div class="flex">
			<input
				id="todo-text"
				:value="todoText"
				class="w-full border-2 border-emerald-400 bg-zinc-800 p-2 text-sm focus-visible:border-fuchsia-400 focus-visible:outline-none"
				name="todo-text"
				type="text"
				required
				:aria-invalid="hasError"
				:aria-describedby="hasError ? 'todo-text-error' : ''"
				@input="handleTodoTextInput"
				@focus="validateTodoText"
			/>
			<button
				class="font-500 bg-emerald-400 px-6 text-zinc-800 ring-inset ring-fuchsia-400 focus-visible:outline-none focus-visible:ring-2"
			>
				Add
			</button>
		</div>
		<span
			v-if="hasError"
			id="todo-text-error"
			class="text-xs text-fuchsia-400"
			>{{ error }}</span
		>
	</form>
</template>
