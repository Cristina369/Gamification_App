import axiosI from "../axios";
import * as actions from "./index";

const Url = "http://localhost:8080/api";
const apiUrl = Url + "/blog";

export const createBlog = async (payload, dispatch) => {
  dispatch(actions.createBlogStart());
  try {
    const { data } = await axiosI.post(apiUrl, payload);
    dispatch(actions.createBlogSuccess(data.data));
    return true;
  } catch (error) {
    dispatch(actions.createBlogFailure());
    return false;
  }
};

export const updateBlog = async (id, blog, dispatch) => {
  dispatch(actions.updateBlogStart());
  try {
    const { data } = await axiosI.put(`/blog/edit/${id}`, blog);
    dispatch(actions.updateBlogSuccess(data.data));
    alert(data.message);
    return true;
  } catch (error) {
    dispatch(actions.updateBlogFailure());
    return false;
  }
};

export const getBlogS = async (id, blog, dispatch) => {
  dispatch(actions.getBlogSStart());
  try {
    const { data } = await axiosI.get(`/blog/specific/${id}`, blog);
    dispatch(actions.getBlogSSuccess(data.data));
    return true;
  } catch (error) {
    dispatch(actions.getBlogSFailure());
    return false;
  }
};

export const addBlog = async (payload, dispatch) => {
  dispatch(actions.addBlogStart());
  try {
    const { data } = await axiosI.put(apiUrl + "/adaugare-piesa/", payload);
    dispatch(actions.addBlogSuccess(data.data));
    alert(data.message);
    return true;
  } catch (error) {
    dispatch(actions.addBlogFailure());
    return false;
  }
};

export const deleteBlog = async (id, dispatch) => {
  dispatch(actions.deleteBlogStart());
  try {
    const { data } = await axiosI.delete(apiUrl + `/${id}`);
    dispatch(actions.deleteBlogSuccess(id));
    alert(data.message);
    return true;
  } catch (error) {
    dispatch(actions.deleteBlogFailure());
    return false;
  }
};

export const getBlog = async (dispatch) => {
  dispatch(actions.getBlogStart());
  try {
    const { data } = await axiosI.get(apiUrl + "/specific");
    dispatch(actions.getBlogSuccess(data.data));
    return true;
  } catch (error) {
    dispatch(actions.getBlogFailure());
    return false;
  }
};

export const getAllBlogs = async (dispatch) => {
  dispatch(actions.getAllBlogsStart());
  try {
    const { data } = await axiosI.get(apiUrl + "/");
    dispatch(actions.getAllBlogsSuccess(data.data));
    return true;
  } catch (error) {
    dispatch(actions.getAllBlogsFailure());
    return false;
  }
};
