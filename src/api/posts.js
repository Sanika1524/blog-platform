import axios from 'axios';
const API = 'http://localhost:3001/posts';

export const getPosts = (page = 1, limit = 5) =>
  axios.get(`${API}?_page=${page}&_limit=${limit}&_sort=id&_order=desc`);

export const createPost = (data) => axios.post(API, data);

export const likePost = (id, currentLikes) =>
  axios.patch(`${API}/${id}`, { likes: currentLikes + 1 });
