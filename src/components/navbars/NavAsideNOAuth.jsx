import React from 'react'
import { useNavigate } from 'react-router-dom';

import { handle2Home, handle2Tracks, handle2Users } from '../../router/coordinator';
export default function NavAsideNOAuth() {
    const navigate = useNavigate();
  return (
      <nav  className='d-flex-row'>

                
                    <button
                      type="button"
              className="middle none center mt-3 mr-3 rounded-lg bg-gradient-to-tr from-purple-600 to-purple-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => handle2Home(navigate)}
                    >
                      HOME
                    </button>
                
                    <button
                      type="button"
                      className="middle none center mt-3 mr-3 rounded-lg bg-gradient-to-tr from-purple-600 to-purple-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => handle2Tracks(navigate)}
                    >
                      TRACKS
                    </button>
                
                    <button
                      type="button"
                      className="middle none center mt-3 mr-3 rounded-lg bg-gradient-to-tr from-purple-600 to-purple-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={() => handle2Users(navigate)}
                    >
                      USERS
                    </button>
           
              </nav>
  )
}
