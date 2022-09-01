<script lang="ts" setup>
	import { storeToRefs } from 'pinia';

	import { useTodoStore } from '~/utils/todoStore';

	const { todos } = $(storeToRefs(useTodoStore()));
</script>

<template>
	<ul>
		<li
			v-for="todo in todos"
			:key="todo.id"
		>
			{{ todo.text }}
		</li>
	</ul>
</template>
