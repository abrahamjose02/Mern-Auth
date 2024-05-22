import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminUser:null,
    loading:false,
    error:false
}

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        adminSignInStart:(state)=>{
            state.loading = true
        },
        adminSignInSuccess:(state,action)=>{
            state.adminUser=action.payload,
            state.loading = false,
            state.error = false
        },
        adminSignInFailure:(state,action)=>{
            state.loading = false,
            state.error= action.payload
        },
        adminUpdateStart:(state)=>{
            state.loading= true
        },
        adminUpdateSuccess:(state,action)=>{
            state.adminUser = action.payload,
            state.loading = false,
            state.error = false
        },
        adminUpdateFailure:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        adminSignOut:(state)=>{
            state.adminUser= null,
            state.loading=false,
            state.error=false
        }
    }
})

export const {
    adminSignInStart,
    adminSignInSuccess,
    adminSignInFailure,
    adminUpdateStart,
    adminUpdateSuccess,
    adminUpdateFailure,
    adminSignOut
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;