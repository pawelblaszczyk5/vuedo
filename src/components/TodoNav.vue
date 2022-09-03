<script lang="ts" setup>
	import { storeToRefs } from 'pinia';

	import NavButton from '~/components/NavButton.vue';
	import {
		useTodoStore,
		type FilterMethod,
		type SortMethod,
	} from '~/utils/todoStore';

	const { sortMethod, filterMethod } = $(storeToRefs(useTodoStore()));

	const { changeFilterMethod, changeSortMethod } = useTodoStore();

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

	const handleSortMethodChange = () => {
		const newSortMethod: SortMethod = sortMethod === 'desc' ? 'asc' : 'desc';

		changeSortMethod(newSortMethod);
	};
</script>

<template>
	<nav class="flex justify-between">
		<NavButton
			v-for="button in filteringButtonsConfig"
			:key="button.filterMethod"
			:active="filterMethod === button.filterMethod"
			@click="() => changeFilterMethod(button.filterMethod)"
			>{{ button.label }}</NavButton
		>
		<NavButton
			:active="true"
			:with-icon="true"
			:aria-label="sortMethodButtonAriaLabel"
			@click="handleSortMethodChange"
			><i
				class="text-xl"
				:class="{
					'i-bi-sort-numeric-down': sortMethod === 'asc',
					'i-bi-sort-numeric-up': sortMethod === 'desc',
				}"
		/></NavButton>
	</nav>
</template>
