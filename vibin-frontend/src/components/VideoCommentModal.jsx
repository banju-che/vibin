import React, { useEffect, useState } from "react";
import { fetchComments, addComment } from "../services/commentService";
import { IoMdClose, IoMdSend } from "react-icons/io";

const CommentModal = ({ videoId, open, onClose }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!open) return;
    fetchComments(videoId).then(setComments).catch(console.error);
  }, [open, videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await addComment(videoId, text);
    setText("");
    setComments(await fetchComments(videoId));
  };

  return (
    <>
      {/* Optional: Backdrop for closing when clicking outside */}
      <div
        className={`fixed inset-0 z-30   transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Right panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] max-w-full bg-white dark:bg-[#1c1c1e] z-40 shadow-lg transform transition-transform duration-300 p-4 flex flex-col justify-between ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">Comments</h2>
          <div
            onClick={onClose}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClose()}
            className="bg-yellow-100 hover:bg-yellow-200 active:scale-95 transition-all duration-200 ease-in-out cursor-pointer p-2 rounded-full shadow"
          >
            <IoMdClose size={24} className="text-gray-800" />
          </div>


        </div>

        {/* Comment list */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="text-sm border-b pb-2">
              <span className="font-medium">@{c.user_username}</span>{" "}
              {c.body}
            </div>
          ))}
        </div>

        {/* Comment form */}
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
          <input
            className="flex-1 border rounded px-3 py-2 text-sm"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handlePost()}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded shadow-md cursor-pointer hover:bg-purple-700 active:scale-95 transition-all duration-200"
          >
            <IoMdSend size={20} />
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentModal;
