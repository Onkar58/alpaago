import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../dbConnect"




const initialState = {
    isAuthenticated: false,
    user: null
}

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true
            state.user = action.payload
        },
        logout(state) {
            state.isAuthenticated = false
            state.user = null
        }
    }
})

export const { login, logout } = authReducer.actions
export default authReducer.reducer