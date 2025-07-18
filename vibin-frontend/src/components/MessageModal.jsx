import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { createComment } from "../services/PostService";

const MessageModal = ({ onClose, comments, setComments, postId }) => {
  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    try {
      setIsPosting(true);
      const comment = await createComment(postId, newComment);
      setComments(prev => [...prev, comment]);  // Update comments in parent
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg border-l border-gray-200 z-50 p-4 transition-transform duration-300">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-sm font-semibold text-green-600">Comments</h2>
        <button onClick={onClose} className="flex items-center justify-center">
          <FaTimes className="text-gray-600 hover:text-red-500" />
        </button>
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-3 text-sm text-gray-700 max-h-[70vh] overflow-y-auto pr-2">
        {comments.length === 0 ? (
          <p className="text-gray-400 italic">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b pb-2">
              <h4 className="font-semibold">{comment.user?.username || comment.user}</h4>
              <p className="mt-1">{comment.body}</p>
              {comment.created_at && (
                <p className="text-xs text-gray-400">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* ✅ Comment Input */}
      <div className="mt-4  pt-3 absolute bottom-2 w-[95%] flex items-center">
        <textarea
          className="w-full rounded-lg p-2 text-sm resize-none border-b"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="mt-2 bg-green-500 py-1 rounded hover:bg-green-600 text-sm disabled:opacity-50"
          onClick={handlePostComment}
          disabled={isPosting}
        >
          {isPosting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
