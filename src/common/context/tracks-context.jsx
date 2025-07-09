import React, {createContext} from "react";
import { useFetch } from "../../hooks/useFetch";

export const TracksContext = createContext();
export const TracksProvider = ({ children }) => {
    
    const {tracks, isLoading, isError}= useFetch(
        "https://projeto-playlists-node-2k25.onrender.com/api", "tracks", []);

      console.log(tracks)

    const values = {
        tracks,
        isLoading,
        isError
    };

    return (
        <TracksContext.Provider value={values}>
            {children}
        </TracksContext.Provider>
    );
};