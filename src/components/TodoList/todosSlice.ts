import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const TO_DO_APP_KEY = "TO_DO_APP";

export interface Todo {
    id: string;
    content: string;
    completed: boolean;
    label: number;
}

const defaultState: Todo[] = [
    { id: "1", content: "Hi", completed: false, label: 1 },
    { id: "2", content: "Welcome to miTask", completed: true, label: 1 },
    { id: "3", content: "Hover to handle me", completed: false, label: 1 },
];

const getLocalStorageData = () => {
    const storedToDoList = localStorage.getItem(TO_DO_APP_KEY);
    return storedToDoList && storedToDoList !== "[]"
        ? JSON.parse(storedToDoList)
        : defaultState;
};

const initialState = getLocalStorageData();

export default createSlice({
    name: "todoList",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            return [action.payload, ...state];
        },
        toggleTodoStatus: (state, action: PayloadAction<string>) => {
            const currentTodo = state.find(
                (todo: Todo) => todo.id === action.payload
            );
            if (currentTodo) currentTodo.completed = !currentTodo.completed;
        },
        editTodo: (state, action: PayloadAction<Todo>) => {
            const { id, ...updatedTodo } = action.payload;
            const index = state.findIndex((todo: Todo) => todo.id === id);

            if (index !== -1) {
                state[index] = { ...state[index], ...updatedTodo };
            }
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            return state.filter((todo: Todo) => todo.id !== action.payload);
        },
        removeCompletedTasks: (state) => {
            return state.filter((todo: Todo) => !todo.completed);
        },
        sortTasks: (state) => {
            const sortedList = [...state].sort((a, b) => {
                if (a.completed === b.completed) {
                    return 0;
                }
                if (a.completed) {
                    return 1;
                }
                return -1;
            });
            return sortedList;
        },
    },
});
