import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./TaskSlice"

export const store = configureStore({
    reducer:{
        tasks:taskReducer,
    },
});

export default store;