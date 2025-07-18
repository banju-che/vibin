import client from "../axios/client";

// all comments for one video
export const fetchComments = async (videoId) =>
  (await client.get(`/comments/?video=${videoId}`)).data;

// create comment
export const addComment = async (videoId, body) =>
  (await client.post("/comments/", { video: videoId, body })).data;
