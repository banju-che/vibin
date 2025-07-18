// src/pages/Home.jsx
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import PostCard from "../components/PostCard";

const Home = () => {
 
  const { logout } = useContext(AuthContext);

  

  return (
    <div className="flex">
      <PostCard />
    </div>
  );
}; 

export default Home;
