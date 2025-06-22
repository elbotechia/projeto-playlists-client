import React from 'react'
import { useNavigate } from 'react-router-dom';

import { handle2Home, handle2Tracks, handle2Users } from '../../router/coordinator';
export default function NavAsideNOAuth() {
    const navigate = useNavigate();
  return (
     <nav className="sidebar">
                <ul>
                  <li>
                    <button
                      type="button"
                      className="btnAside focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                      onClick={() => handle2Home(navigate)}
                    >
                      HOME
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="btnAside focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                      onClick={() => handle2Tracks(navigate)}
                    >
                      TRACKS
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="btnAside focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                      onClick={() => handle2Users(navigate)}
                    >
                      USERS
                    </button>
                  </li>
                </ul>
              </nav>
  )
}
