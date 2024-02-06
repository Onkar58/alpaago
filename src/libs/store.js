import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authReducer";

const store = configureStore({
    reducer: {
        authReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false
    // })
})

export default store;