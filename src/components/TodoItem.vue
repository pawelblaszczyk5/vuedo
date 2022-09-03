<script lang="ts" setup>
	import { useTodoStore, type Todo, type TodoStatus } from '~/utils/todoStore';

	const { todo } = defineProps<{ todo: Todo }>();

	const { removeTodo, changeTodoStatus } = useTodoStore();

	const changeStatusButtonAriaLabel = $computed(
		() =>
			`Mark todo as ${
				todo.status === 'completed' ? 'uncompleted' : 'completed'
			}`,
	);

	const handleStatusChange = () => {
		const newTodoStatus: TodoStatus =
			todo.status === 'completed' ? 'uncompleted' : 'completed';

		changeTodoStatus(todo.id, newTodoStatus);
	};

	const handleRemove = () => removeTodo(todo.id);
</script>

<template>
	<li class="b-2 flex items-center gap-1 border-emerald-400 py-2 px-3">
		<span
			class="block w-full truncate decoration-1"
			:class="{
				'font-200 text-zinc-300 line-through': todo.status === 'completed',
			}"
			>{{ todo.text }}</span
		>
		<button
			:aria-label="changeStatusButtonAriaLabel"
			class="w-8 text-emerald-400 ring-fuchsia-400 focus-visible:outline-none focus-visible:ring-2"
			@click="handleStatusChange"
		>
			<i
				aria-hidden
				:class="{
					'i-bi-dash text-2xl': todo.status === 'completed',
					'i-bi-check text-2xl': todo.status === 'uncompleted',
				}"
			/>
		</button>
		<button
			aria-label="Remove todo"
			class="w-8 text-emerald-400 ring-fuchsia-400 focus-visible:outline-none focus-visible:ring-2"
			@click="handleRemove"
		>
			<i
				aria-hidden
				class="i-bi-x text-2xl"
			/>
		</button>
	</li>
</template>
