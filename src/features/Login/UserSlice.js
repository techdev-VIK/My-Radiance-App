// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const backendUrl = "https://radiance-backend.vercel.app"

// export const fetchUser = createAsyncThunk("users/fetchUsers", async (username) => {
//     try {
//         const response = await axios.get(`${backendUrl}/users/read/${username}`);
//         console.log("Response:", response); // Should log the response
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching user:", error); // Check for errors
//         throw error; // Rethrow error for rejection handling
//     }
// });

// export const userSlice = createSlice({
//     name: "users",
//     initialState: {
//         user: [],
//         status: "idle",
//         error: null
//     },
//     reducers:{

//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchUser.pending, (state) => {
//             state.status = "loading"
//         }),
//         builder.addCase(fetchUser.fulfilled, (state, action) => {
//             state.status = "success",
//             state.user = action.payload
//         }),
//         builder.addCase(fetchUser.rejected, (state, action) => {
//             state.status = "error",
//             state.error = action.error.message
//         })
//     }
// })


// export default userSlice.reducer;