import type { RootState } from "./store";

export const selectTodoList = (state: RootState) => state.todoList;
