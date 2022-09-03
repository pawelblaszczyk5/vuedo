<script lang="ts" setup>
	import { storeToRefs } from 'pinia';

	import TodoItem from '~/components/TodoItem.vue';
	import { useTodoStore } from '~/utils/todoStore';

	const { todos } = $(storeToRefs(useTodoStore()));
</script>

<template>
	<ul
		v-auto-animate
		class="flex flex-col gap-3"
		:class="{ '-my-2': todos.length === 0 }"
	>
		<TodoItem
			v-for="todo in todos"
			:key="todo.id"
			:todo="todo"
		/>
	</ul>
</template>
