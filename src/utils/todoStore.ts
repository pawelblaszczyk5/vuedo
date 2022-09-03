import { acceptHMRUpdate, defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

export interface Todo {
	text: string;
	id: string;
	createdAt: number;
	status: 'completed' | 'uncompleted';
}

type TodoId = Todo['id'];
type TodoText = Todo['text'];
type TodoStatus = Todo['status'];

export const useTodoStore = defineStore('counter', () => {
	const todos = $ref<Array<Todo>>([]);

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

	return { todos: $$(todos), createTodo, changeTodoStatus };
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));
}
