import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		getUserProgress: false,
		updateUserProgress: false,
		apBlogsProgress: false,
		error: false,
	},
	reducers: {
		getUserStart: (state) => {
			state.getUserProgress = true;
		},
		getUserSuccess: (state, action) => {
			state.user = action.payload;
			state.getUserProgress = false;
		},
		getUserFailure: (state) => {
			state.getUserProgress = false;
			state.error = true;
		},

		updateUserStart: (state) => {
			state.updateUserProgress = true;
		},
		updateUserSuccess: (state, action) => {
			state.user = action.payload;
			state.updateUserProgress = false;
		},
		updateUserFailure: (state) => {
			state.updateUserProgress = false;
			state.error = true;
		},

		apBlogsStart: (state) => {
			state.likeBlogProgress = true;
		},
		apBlogsSuccess: (state, action) => {
			const index = state.user.likedBlogs.indexOf(action.payload);
			index === -1
				? state.user.likedBlogs.push(action.payload)
				: state.user.likedBlogs.splice(index, 1);
			state.likeBlogProgress = false;
		},
		apBlogsFailure: (state) => {
			state.likeBlogProgress = false;
			state.error = true;
		},
	},
});

export const {
	getUserStart,
	getUserSuccess,
	getUserFailure,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	apBlogsStart,
	apBlogsSuccess,
	apBlogsFailure,
} = userSlice.actions;

export default userSlice.reducer;
