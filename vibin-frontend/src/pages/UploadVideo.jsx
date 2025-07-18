import React, { useState } from "react";
import { uploadVideo } from "../services/videoService";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const fd = new FormData();
    fd.append("video", file);
    fd.append("caption", caption);
    await uploadVideo(fd);
    nav("/"); // back to feed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl w-full max-w-sm space-y-4"
      >
        <h1 className="text-lg font-semibold text-center">Upload Video</h1>

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm"
        />

        {file && (
          <video
            src={URL.createObjectURL(file)}
            className="w-full h-40 object-cover rounded"
            controls
            muted
          />
        )}

        <textarea
          className="w-full h-24 p-2 text-sm text-black rounded"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded text-sm font-medium"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
