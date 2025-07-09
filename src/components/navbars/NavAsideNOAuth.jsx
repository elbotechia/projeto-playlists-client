import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handle2Home, handle2Tracks, handle2Users } from '../../router/coordinator';

export default function NavAsideNOAuth() {
  const navigate = useNavigate();
  
  return (
    <nav className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        className="nav-button"
        onClick={() => handle2Home(navigate)}
      >
        🏠 HOME
      </button>
      
      <button
        type="button"
        className="nav-button"
        onClick={() => handle2Tracks(navigate)}
      >
        🎵 TRACKS
      </button>
      
      <button
        type="button"
        className="nav-button"
        onClick={() => handle2Users(navigate)}
      >
        👥 USERS
      </button>
    </nav>
  );
}
