// src/pages/UserProfile.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from '../services/profileService'

const UserProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  console.log("userId from useParams:", userId);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchUserProfile(userId)
        setProfile(data);
      } catch (err) {
        setError("User profile not found");
        console.error(err);
      }
    };

    fetchProfile();
  }, [userId]);

  if (error) return <div>{error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-card">
      <h2>@{profile.username}</h2>
      <p>Email: {profile.email}</p>
      <p>Bio: {profile.bio || "No bio"}</p>
      <p>Location: {profile.location || "Unknown"}</p>
      {profile.avatar && <img src={profile.avatar} alt="avatar" width={150} />}
    </div>
  );
};

export default UserProfile;
