import { createSlice } from "@reduxjs/toolkit";

export const questSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    createQuestProgress: false,
    getQuestProgress: false,
    getQuestsProgress: false,
    addQuestProgress: false,
    acceptQuestProgress: false,
    updateBlogProgress: false,
    error: false,
  },
  reducers: {
    createQuestStart: (state) => {
      state.createQuestProgress = true;
    },
    createQuestSuccess: (state, action) => {
      state.blogs.push(action.payload);
      state.createQuestProgress = false;
    },
    createQuestFailure: (state) => {
      state.error = true;
      state.createQuestProgress = false;
    },

    getBlogStart: (state) => {
      state.getBlogProgress = true;
    },
    getBlogSuccess: (state, action) => {
      state.blogs = action.payload;
      state.getBlogProgress = false;
    },
    getBlogFailure: (state) => {
      state.error = true;
      state.getBlogProgress = false;
    },

    getBlogSStart: (state) => {
      state.getBlogSProgress = true;
    },
    getBlogSSuccess: (state, action) => {
      state.blogs = action.payload;
      state.getBlogSProgress = false;
    },
    getBlogSFailure: (state) => {
      state.error = true;
      state.getBlogSProgress = false;
    },

    updateBlogStart: (state) => {
      state.updateUserProgress = true;
    },
    updateBlogSuccess: (state, action) => {
      state.user = action.payload;
      state.updateBlogProgress = false;
    },
    updateBlogFailure: (state) => {
      state.updateBlogProgress = false;
      state.error = true;
    },

    addQuestStart: (state) => {
      state.addBlogProgress = true;
    },
    addQuestSuccess: (state, action) => {
      const index = state.blogs.indexOf(action.payload._id);
      state.blogs[index] = action.payload;
      state.addBlogProgress = false;
    },
    acceptQuestFailure: (state) => {
      state.error = true;
      state.addQuestProgress = false;
    },

    acceptQuestStart: (state) => {
      state.acceptQuestProgress = true;
    },
    acceptQuestSuccess: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      state.acceptQuestProgress = false;
    },
    accepQuestFailure: (state) => {
      state.error = true;
      state.acceptQuestProgress = false;
    },
  },
});

export const {
  createBlogStart,
  createBlogSuccess,
  createBlogFailure,
  getBlogStart,
  getBlogSuccess,
  getBlogFailure,
  getBlogSStart,
  getBlogSSuccess,
  getBlogSFailure,
  updateBlogStart,
  updateBlogSuccess,
  updateBlogFailure,
  addQuestStart,
  addQuestSuccess,
  addQuestFailure,
  acceptQuestStart,
  acceptQuestSuccess,
  acceptQuestFailure,
} = questSlice.actions;

export default questSlice.reducer;
