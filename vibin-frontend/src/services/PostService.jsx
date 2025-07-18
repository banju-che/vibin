// src/services/postService.js
import client from "../axios/client";

export const fetchAllPosts = async () => {
  const response = await client.get('/posts/');
  return response.data;
};

// Toggle like (like or unlike a post)
export const toggleLike = async (postId) => {
  const response = await client.post(`/likes/toggle/${postId}/`);
  return response.data; 
};

export const createComment = async (postId, body) => {
  const response = await client.post(`/comments/${postId}/`, {
    
    body: body
  });
  return response.data;
};