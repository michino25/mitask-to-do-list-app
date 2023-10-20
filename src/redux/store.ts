import { configureStore } from "@reduxjs/toolkit";
// import filtersSlice from "../components/Filter/filtersSlice";
import todosSlice from "../components/TodoList/todosSlice";

export const store = configureStore({
    reducer: {
        // filter: filtersSlice.reducer,
        todoList: todosSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
