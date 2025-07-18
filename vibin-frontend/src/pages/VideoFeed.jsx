// src/pages/VideoFeed.jsx
import React, { useEffect, useRef, useState } from 'react';
import { fetchAllVideos } from '../services/videoService';
import VideoCard from '../components/VideoCard';
import { FaArrowUp, FaArrowDown, FaPlay, FaPause } from 'react-icons/fa';

const VideoFeed = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchVideosAsync = async () => {
      try {
        const data = await fetchAllVideos();
        setVideos(data);
      } catch (err) {
        console.error('Failed to fetch videos', err);
      }
    };
    fetchVideosAsync();
  }, []);

  useEffect(() => {
    const observers = [];

    videoRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentIndex(index);
          }
        },
        { threshold: 0.75 }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [videos]);

  const scrollToIndex = (index) => {
    if (index >= 0 && index < videos.length) {
      videoRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const togglePlayPause = () => {
    const videoEl = videoRefs.current[currentIndex]?.querySelector('video');
    if (videoEl) {
      if (videoEl.paused) {
        videoEl.play();
        setIsPaused(false);
      } else {
        videoEl.pause();
        setIsPaused(true);
      }
    }
  };

  return (
        <div className='ml-50 relative'>
          <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black relative ">
            {videos.map((video, index) => (
              <div
                key={video.id}
                ref={(el) => (videoRefs.current[index] = el)}
                className="snap-start w-150 bg-white "
              >
                <VideoCard video={video} />
              </div>
            ))}
            </div>

          {/* Floating Controls */}
          <div className="fixed bottom-80 right-100 z-50">
            <div className="bg-gray-200/20 rounded-2xl p-3 flex flex-col items-center gap-4 shadow-md  backdrop-blur-lg">
              
              <div
                onClick={() => scrollToIndex(currentIndex - 1)}
                className="bg-gray-300 text-black p-3 rounded-full shadow hover:bg-gray-400 transition cursor-pointer"
                title="Previous"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && scrollToIndex(currentIndex - 1)}
              >
                <FaArrowUp size={20} />
              </div>

              <div
                onClick={togglePlayPause}
                className="bg-gray-300 text-black p-3 rounded-full shadow hover:bg-gray-400 transition cursor-pointer"
                title="Play/Pause"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && togglePlayPause()}
              >
                {isPaused ? <FaPlay size={20} /> : <FaPause size={20} />}
              </div>

              <div
                onClick={() => scrollToIndex(currentIndex + 1)}
                className="bg-gray-300 text-black p-3 rounded-full shadow hover:bg-gray-400 transition cursor-pointer"
                title="Next"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && scrollToIndex(currentIndex + 1)}
              >
                <FaArrowDown size={20} />
              </div>

            </div>
          </div>


    </div>
  )
    };

export default VideoFeed;
