<script lang="ts" setup>
	import { storeToRefs } from 'pinia';

	import NavButton from '~/components/NavButton.vue';
	import {
		useTodoStore,
		type FilterMethod,
		type SortMethod,
	} from '~/utils/todoStore';

	const { sortMethod, filterMethod, todosLeftCount, todosCompletedCount } = $(
		storeToRefs(useTodoStore()),
	);

	const { changeFilterMethod, changeSortMethod, clearAllCompletedTodos } =
		useTodoStore();

	const filteringButtonsConfig: Array<{
		filterMethod: FilterMethod;
		label: string;
	}> = [
		{ filterMethod: 'all', label: 'All' },
		{ filterMethod: 'uncompleted', label: 'Active' },
		{ filterMethod: 'completed', label: 'Completed' },
	];

	const sortMethodButtonAriaLabel = $computed(
		() =>
			`Sort by creation date ${
				sortMethod === 'asc' ? 'descending' : 'ascending'
			}`,
	);

	const infoText = $computed(() => {
		if (todosCompletedCount === 0 && todosLeftCount === 0) {
			return 'Start by adding some todo!';
		}

		return todosLeftCount === 0
			? 'Congrats! All todos done'
			: `${todosLeftCount} todos left`;
	});

	const handleSortMethodChange = () => {
		const newSortMethod: SortMethod = sortMethod === 'desc' ? 'asc' : 'desc';

		changeSortMethod(newSortMethod);
	};
</script>

<template>
	<nav class="flex flex-wrap gap-2">
		<NavButton
			v-for="button in filteringButtonsConfig"
			:key="button.filterMethod"
			:primary="filterMethod === button.filterMethod"
			class="flex-1 px-5"
			@click="() => changeFilterMethod(button.filterMethod)"
			>{{ button.label }}</NavButton
		>
		<NavButton
			:aria-label="sortMethodButtonAriaLabel"
			class="px-3"
			@click="handleSortMethodChange"
			><i
				class="text-xl"
				:class="{
					'i-bi-sort-numeric-down': sortMethod === 'asc',
					'i-bi-sort-numeric-up': sortMethod === 'desc',
				}"
		/></NavButton>
	</nav>
	<div class="font-200 text-sm text-zinc-300">
		<span class="mr-2 inline-block">{{ infoText }}</span>
		<button
			v-if="todosCompletedCount > 0"
			class="inline-block text-emerald-400"
			@click="clearAllCompletedTodos"
		>
			Clear all completed
		</button>
	</div>
</template>
