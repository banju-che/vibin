// src/services/profileService.js
import client from "../axios/client";

// ✅ Fetch the logged-in user's profile
export const fetchMyProfile = async () => {
  const response = await client.get("/accounts/me/");
  return response.data;
};

// ✅ Fetch a specific user's profile by ID
export const fetchUserProfile = async (userId) => {
  const response = await client.get(`/accounts/${userId}/`);
  console.log(response)
  return response.data;
};

// ✅ Optionally: Update profile (you can extend this later)
export const updateProfile = async (data) => {
  const response = await client.put("/accounts/me/", data);
  return response.data;
};
