// src/pages/MyProfile.jsx

import React, { useEffect, useState } from "react";
import { fetchMyProfile } from "../services/profileService";


const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchMyProfile()
        setProfile(data);
      } catch (err) {
        setError("Failed to fetch profile");
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!profile) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center">
          {profile.avatar && (
            <img
              src={profile.avatar}
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 mb-4"
            />
          )}
          <h2 className="text-2xl font-bold">@{profile.username}</h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>

        <div className="mt-6 space-y-2">
          <p><span className="font-semibold">Bio:</span> {profile.bio || "No bio yet"}</p>
          <p><span className="font-semibold">Location:</span> {profile.location || "Not set"}</p>
        </div>

        <button className="mt-6 px-4 py-2 bg-black text-white rounded-full hover:opacity-90">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
