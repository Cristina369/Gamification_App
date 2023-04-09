import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    createBlogProgress: false,
    getBlogProgress: false,
    getBlogSProgress: false,
    getAllBlogsProgress: false,
    addBlogProgress: false,
    deleteBlogProgress: false,
    updateBlogProgress: false,
    error: false,
  },
  reducers: {
    createBlogStart: (state) => {
      state.createBlogProgress = true;
    },
    createBlogSuccess: (state, action) => {
      state.blogs.push(action.payload);
      state.createBlogProgress = false;
    },
    createBlogFailure: (state) => {
      state.error = true;
      state.createBlogProgress = false;
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

    getAllBlogsStart: (state) => {
      state.getBlogProgress = true;
    },
    getAllBlogsSuccess: (state, action) => {
      state.blogs = action.payload;
      state.getBlogProgress = false;
    },
    getAllBlogsFailure: (state) => {
      state.error = true;
      state.getBlogProgress = false;
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

    addBlogStart: (state) => {
      state.addBlogProgress = true;
    },
    addBlogSuccess: (state, action) => {
      const index = state.blogs.indexOf(action.payload._id);
      state.blogs[index] = action.payload;
      state.addBlogProgress = false;
    },
    deleteBlogFailure: (state) => {
      state.error = true;
      state.addBlogProgress = false;
    },

    deleteBlogStart: (state) => {
      state.deletePlayListProgress = true;
    },
    deleteBlogSuccess: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      state.deleteBlogProgress = false;
    },
    deleteBlogFailure: (state) => {
      state.error = true;
      state.deleteBlogProgress = false;
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
  getAllBlogsStart,
  getAllBlogsSuccess,
  getAllBlogsFailure,
  updateBlogStart,
  updateBlogSuccess,
  updateBlogFailure,
  addBlogStart,
  addBlogSuccess,
  addBlogFailure,
  deleteBlogStart,
  deleteBlogSuccess,
  deleteBlogFailure,
} = blogSlice.actions;

export default blogSlice.reducer;
