import React, { useState, useEffect } from "react";
import { fetchAllPosts, toggleLike  } from "../services/PostService";
import { FaHeart, FaCommentDots, FaShare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MessageModal from './MessageModal'; 

const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);  
  const [selectedComments, setSelectedComments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
      } catch (err) {
        setError("Couldn't load feed. Try logging in again.");
      }
    };

    loadFeed();
  }, []);

  
  // ✅ Handle like/unlike
  const handleLike = async (postId) => {
      try {
        const result = await toggleLike(postId);
        const updatedPosts = posts.map(post =>
          post.id === postId
            ? {
                ...post,
                likes_count: result.likes_count,
                liked_by_user: result.liked_by_user,
              }
            : post
        );
        setPosts(updatedPosts);
      } catch (err) {
        console.error("Failed to like/unlike:", err);
      }
    };

    const goToProfile = () => {
      navigate("/profile");
    };

  return (
    <main className="min-h-screen ml-14 px-4 py-6">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex flex-col gap-6">
        {posts.length === 0 ? (
          <p>No posts yet. Follow users to see their posts.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white ml-50 p-4 border border-gray-200 rounded-2xl shadow w-[500px] relative"
            >
              {/* Image */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-[400px] h-[700px] object-cover rounded-lg"
                />
              )}

              {/* Caption */}
              <p className="mt-4 mb-2 text-gray-700 text-sm">{post.caption}</p>
              <button onClick={goToProfile}>
                Go to Profile
              </button>
              {/* Action bar */}
              <div className="flex flex-col w-[10%] h-[30%] items-center justify-around text-gray-600 text-xl mb-2 absolute bottom-12 right-4">
                {/* ✅ Like */}
                <div className="flex flex-col w-12 h-[28%] items-center justify-center">
                  <div
                    onClick={() => handleLike(post.id)}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-[#eff3ef] hover:scale-110 transition cursor-pointer"
                    title="Like or unlike"
                  >
                    <FaHeart
                      className={`text-2xl transition ${
                        post.liked_by_user ? "text-red-500" : "text-gray-500"
                      }`}
                    />

                  </div>
                  <span className="text-sm">{post.likes_count}</span>
                </div>

                {/* Comment */}
                <div className="flex flex-col w-12 h-[28%] items-center justify-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#eff3ef]">
                  <button
                    onClick={() => {
                      setSelectedComments(post.comments || []);
                      setShowModal(true);
                    }}
                  >
                      <FaCommentDots className="hover:text-blue-500 cursor-pointer text-sm" />
                    </button>
                  </div>
                  <span className="text-sm">{post.comments?.length || 0}</span>
                </div>

                {/* Share */}
                <div className="w-full h-[20%] flex items-center justify-center rounded-full bg-[#eff3ef]">
                  <FaShare className="hover:text-green-500 cursor-pointer text-sm" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Slide-in Modal */}
      {showModal && (
  <MessageModal
    onClose={() => setShowModal(false)}
    comments={selectedComments}
    setComments={(updated) => {
      const updatedPosts = posts.map(post =>
        post.id === selectedComments[0]?.post
          ? { ...post, comments: updated }
          : post
      );
      setPosts(updatedPosts);
      setSelectedComments(updated);
    }}
    postId={selectedComments[0]?.post}
  />
)}
    </main>
  );
};

export default PostCard;
