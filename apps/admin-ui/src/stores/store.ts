import datagridReducer from "@/slices/datagridSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        datagrid: datagridReducer,
    },
})

export default store;