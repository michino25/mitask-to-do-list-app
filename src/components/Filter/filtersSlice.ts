import { createSlice } from "@reduxjs/toolkit";

interface Filter {
    search: string;
    status: string;
    labels: [];
}

// Define the initial state using that type
const initialState: Filter = {
    search: "",
    status: "All",
    labels: [],
};

export default createSlice({
    name: "filters",
    initialState,
    reducers: {
        searchFilterChange: (state, action) => {
            // mutation - IMMER
            state.search = action.payload;
        },
        statusFilterChange: (state, action) => {
            state.status = action.payload;
        },
        labelsFilterChange: (state, action) => {
            state.labels = action.payload;
        },
    },
});
