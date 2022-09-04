import { acceptHMRUpdate, defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

const todoArraySchema = z.array(
	z.object({
		text: z.string(),
		id: z.string(),
		createdAt: z.number(),
		status: z.enum(['completed', 'uncompleted']),
	}),
);

const todoSchema = todoArraySchema.element;

type Todo = z.infer<typeof todoSchema>;

export type TodoId = Todo['id'];
export type TodoText = Todo['text'];
export type TodoStatus = Todo['status'];

export type SortMethod = 'desc' | 'asc';
export type FilterMethod = 'all' | TodoStatus;

const TODOS_LOCAL_STORAGE_KEY = 'todos-storage';

const safeJsonParse = (stringToParse?: string | null) => {
	try {
		const parsedValue = JSON.parse(stringToParse ?? '') as unknown;

		return parsedValue;
	} catch {
		return null;
	}
};

export const useTodoStore = defineStore('counter', () => {
	let todos = $ref<Array<Todo>>([]);
	let sortMethod = $ref<SortMethod>('asc');
	let filterMethod = $ref<FilterMethod>('all');

	try {
		const savedTodos = todoArraySchema.parse(
			safeJsonParse(localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)),
		);

		todos = savedTodos;
	} catch {
		localStorage.removeItem(TODOS_LOCAL_STORAGE_KEY);
	}

	const persistTodos = () => {
		localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(todos));
	};

	const createTodo = (text: TodoText) => {
		todos.push({
			text,
			id: uuid(),
			createdAt: Date.now(),
			status: 'uncompleted',
		});

		persistTodos();
	};

	const changeTodoStatus = (idToChange: TodoId, newStatus: TodoStatus) => {
		const todoToModify = todos.find(({ id }) => idToChange === id);

		if (!todoToModify) return;

		todoToModify.status = newStatus;
		persistTodos();
	};

	const removeTodo = (idToRemove: TodoId) => {
		todos = todos.filter(({ id }) => id !== idToRemove);
		persistTodos();
	};

	const changeSortMethod = (newSortMethod: SortMethod) =>
		void (sortMethod = newSortMethod);

	const changeFilterMethod = (newFilterMethod: FilterMethod) =>
		void (filterMethod = newFilterMethod);

	const todosToDisplay = $computed(() => {
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
