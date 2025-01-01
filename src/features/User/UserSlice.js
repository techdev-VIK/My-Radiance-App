import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = "https://radiance-backend.vercel.app"

export const fetchUser = createAsyncThunk("users/fetchUsers", async (username) => {
    try {
        const response = await axios.get(`${backendUrl}/users/read/${username}`);
        
        return response.data;
    } catch (error) {
        
        throw error; 
    }
});


export const createUser = createAsyncThunk("users/createNew", async (newUser) => {
    try {
        const response = await axios.post(`${backendUrl}/users/createNew`, newUser);

        return response.data;
    } catch (error) {
        throw error;
    }
});

export const updateUser = createAsyncThunk("users/update", async(editUser) => {
    const response = await axios.put(`${backendUrl}/user/edit/${editUser._id}`, editUser);

    return response.data;
})

export const userSlice = createSlice({
    name: "users",
    initialState: {
        user: [],
        status: "idle",
        error: null
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.status = "loading";
        }),
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.status = "success";
            state.user = action.payload
        }),
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message
        }),
        builder.addCase(createUser.pending, (state) => {
            state.status = "loading";
        }),
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.status = "success";
            state.user.push(action.payload);
        }),
        builder.addCase(createUser.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        }),
        builder.addCase(updateUser.pending, (state) => {
            state.status = "loading";
        }),
        builder.addCase(updateUser.fulfilled, (state, action) => {
            console.log("Update fulfilled payload:", action.payload);
        
            state.status = "success";

            
            state.user = action.payload
            
        }),
        builder.addCase(updateUser.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        })
    }
})


export default userSlice.reducer;