
import { useRef, useState } from 'react';
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";

export function PlayPauseButton({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center justify-center">
      <audio 
        ref={audioRef} 
        src={src} 
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button 
        onClick={handlePlayPause}
        className="group relative p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
      >
        {isPlaying ? (
          <FaPauseCircle className="text-white text-3xl group-hover:text-white/90 transition-colors" />
        ) : (
          <FaPlayCircle className="text-white text-3xl group-hover:text-white/90 transition-colors" />
        )}
        
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
    </div>
  );
}