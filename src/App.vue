<script lang="ts" setup>
	import TodoForm from '~/components/TodoForm.vue';
	import TodoList from '~/components/TodoList.vue';
</script>

<template>
	<h1
		class="font-200 flex items-center justify-center gap-2 text-center text-5xl"
	>
		TODOs
		<i
			aria-hidden
			class="i-bi-card-checklist text-emerald-400"
		/>
	</h1>
	<main
		class="mx-auto my-6 flex w-full max-w-xs flex-col items-center justify-center gap-4"
	>
		<TodoForm />
		<TodoList />
	</main>
</template>
