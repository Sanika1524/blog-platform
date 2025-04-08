import axios from 'axios';
const API = 'http://localhost:3001/comments';

export const getCommentsByPostId = (postId) =>
  axios.get(`${API}?postId=${postId}&_sort=id&_order=asc`);

export const addComment = (data) => axios.post(API, data);

export const likeComment = (id, currentLikes) =>
  axios.patch(`${API}/${id}`, { likes: currentLikes + 1 });
