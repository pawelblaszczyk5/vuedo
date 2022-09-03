import { acceptHMRUpdate, defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { computed } from 'vue';

export interface Todo {
	text: string;
	id: string;
	createdAt: number;
	status: 'completed' | 'uncompleted';
}

export type TodoId = Todo['id'];
export type TodoText = Todo['text'];
export type TodoStatus = Todo['status'];

export type SortMethod = 'desc' | 'asc';
export type FilterMethod = 'all' | TodoStatus;

export const useTodoStore = defineStore('counter', () => {
	let todos = $ref<Array<Todo>>([]);
	let sortMethod = $ref<SortMethod>('asc');
	let filterMethod = $ref<FilterMethod>('all');

	const createTodo = (text: TodoText) =>
		void todos.push({
			text,
			id: uuid(),
			createdAt: Date.now(),
			status: 'uncompleted',
		});

	const changeTodoStatus = (idToChange: TodoId, newStatus: TodoStatus) => {
		const todoToModify = todos.find(({ id }) => idToChange === id);

		if (!todoToModify) return;

		todoToModify.status = newStatus;
	};

	const removeTodo = (idToRemove: TodoId) =>
		void (todos = todos.filter(({ id }) => id !== idToRemove));

	const changeSortMethod = (newSortMethod: SortMethod) =>
		void (sortMethod = newSortMethod);

	const changeFilterMethod = (newFilterMethod: FilterMethod) =>
		void (filterMethod = newFilterMethod);

	const todosToDisplay = computed(() => {
		const todosToDisplay = todos.filter(todo => {
			if (filterMethod === 'all') return true;

			return todo.status === filterMethod;
		});

		todosToDisplay.sort((firstTodo, secondTodo) => {
			if (sortMethod === 'asc')
				return firstTodo.createdAt - secondTodo.createdAt;

			return secondTodo.createdAt - firstTodo.createdAt;
		});

		return todosToDisplay;
	});

	return {
		todos: $$(todosToDisplay),
		sortMethod: $$(sortMethod),
		filterMethod: $$(filterMethod),
		createTodo,
		changeTodoStatus,
		removeTodo,
		changeSortMethod,
		changeFilterMethod,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));
}
