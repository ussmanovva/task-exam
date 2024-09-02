import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://3a42db7a820218dd.mokky.dev/authorization";

export const login = createAsyncThunk("auth/login", async (formData) => {
	const response = await axios.post(API_URL, formData);
	return response.data;
});

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated: false,
		user: null,
		status: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.user = action.payload;
				state.status = "succeeded";
			})
			.addCase(login.rejected, (state) => {
				state.isAuthenticated = false;
				state.status = "failed";
			});
	},
});

export default authSlice.reducer;
