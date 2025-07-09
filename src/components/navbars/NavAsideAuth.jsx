import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handle2Home, handle2Manager, handle2Tracks } from '../../router/coordinator';
import { LogoutButton } from '../buttons/LogoutButton';

export default function NavAsideAuth() {
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
        onClick={() => handle2Manager(navigate)}
      >
        ⚙️ MANAGER
      </button>
      
      <LogoutButton />
    </nav>
  );
}
