// src/components/VideoCard.jsx
import React, { useRef, useEffect, useState } from "react";
import { FaHeart, FaCommentDots, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import CommentModal from "./VideoCommentModal";
import { toggleVideoLike } from "../services/videoService";


const VideoCard = ({ video }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [liked, setLiked] = useState(video?.liked_by_user ?? false);
  const [likesCount, setLikesCount] = useState(video?.likes_count ?? 0);
  const [showComments, setShowComments] = useState(false);
  const [muted, setMuted] = useState(false);

  // Auto-play / pause when in view
  useEffect(() => {
      const observer = new IntersectionObserver(
        async ([entry]) => {
          if (videoRef.current) {
            try {
              if (entry.isIntersecting) {
                await videoRef.current.play();
              } else {
                videoRef.current.pause();
              }
            } catch (error) {
              console.warn("Autoplay failed:", error.message);
            }
          }
        },
        { threshold: 0.75 }
      );
    
      const current = containerRef.current;
      if (current) observer.observe(current);
    
      return () => {
        if (current) observer.unobserve(current);
      };
    }, []);
    
  // Like toggle handler

  const handleLikeToggle = async () => {
    try {
      const result = await toggleVideoLike(video.id);
      setLikesCount(result.likes_count);
      setLiked(result.liked_by_user);
    } catch (err) {
      console.error("Failed to like/unlike", err);
    }
  };


  if (!video || !video.video) return null;

  return (
    <div
      ref={containerRef}
      className="h-screen w-full relative snap-start flex items-end justify-between p-4"
    >
      <video
        ref={videoRef}
        src={video.video}
        muted={muted}
        playsInline
        autoPlay
        loop
        className="absolute top-0 left-0 w-[30rem] h-full object-cover"
      />
  
      {/* Bottom-left caption */}
      <div className="relative z-10 text-white space-y-2 max-w-[80%]">
        <p className="font-semibold text-sm">@user {video.user}</p>
        <p className="text-base">{video.caption}</p>
      </div>
  
      {/* Right-side controls */}
      <div className="relative z-10 space-y-4 flex flex-col items-center justify-between mr-1 h-[40%] p-2 ">
        
        {/* Like button */}
        <div className="flex flex-col items-center justify-center">
          <div
            onClick={handleLikeToggle}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleLikeToggle()}
            role="button"
            tabIndex={0}
            className="rounded-full w-12 h-12 flex items-center justify-center cursor-pointer bg-black/20"
          >
            <FaHeart className={`text-2xl ${liked ? "text-red-500" : "text-gray-800"}`} />
          </div>
          <p className="text-sm ">{likesCount}</p>
        </div>
  
        {/* Comment button */}
        <div
          onClick={() => setShowComments(true)}
          role="button"
          tabIndex={0}
          className="relative rounded-full w-12 h-12 flex items-center justify-center cursor-pointer bg-black/20"
        >
          <FaCommentDots className="text-2xl" />
        </div>
  
        {/* Mute toggle */}
        <div
          onClick={() => setMuted((m) => !m)}
          role="button"
          tabIndex={0}
          className="rounded-full w-12 h-12 flex items-center justify-center cursor-pointer bg-black/20"
        >
          {muted ? (
            <FaVolumeMute className="text-xl" />
          ) : (
            <FaVolumeUp className="text-xl" />
          )}
        </div>
      </div>
  
      <CommentModal
        videoId={video.id}
        open={showComments}
        onClose={() => setShowComments(false)}
      />
    </div>
  );
  
}
export default VideoCard;
