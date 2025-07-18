// src/services/videoService.js
import client from "../axios/client";

// ✅ Fetch all loopsta videos
export const fetchAllVideos = async () => {
  const response = await client.get("/loopsta/");
  return response.data;
};

// ✅ Fetch a single video by ID
export const fetchVideoById = async (videoId) => {
  const response = await client.get(`/loopsta/${videoId}/`);
  return response.data;
};

// ✅ Upload a new video (FormData: video file + caption)
export const uploadVideo = async (formData) => {
  const response = await client.post("/loopsta/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// src/services/videoService.js

export const toggleVideoLike = async (videoId) => {
  const response = await client.post("/likes/toggle/", { video_id: videoId });
  return response.data;
};

