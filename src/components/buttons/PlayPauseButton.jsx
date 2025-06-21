
import { useRef, useState } from 'react'
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
export  function PlayPauseButton({ src }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div>
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
      <button onClick={handlePlayPause}>
        {isPlaying ? (<FaPauseCircle />
) : (<FaPlayCircle />)
}
      </button>
    </div>
  )
}