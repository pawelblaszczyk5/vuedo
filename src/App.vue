<script lang="ts" setup>
	import TodoForm from '~/components/TodoForm.vue';
	import TodoList from '~/components/TodoList.vue';
</script>

<template>
	<main class="flex flex-col items-center justify-center gap-4 p-8">
		<h1 class="font-200 flex items-center gap-2 text-4xl">
			TODOs
			<i
				aria-hidden
				class="i-bi-card-checklist text-emerald-400"
			/>
		</h1>
		<TodoForm />
		<TodoList />
	</main>
</template>
