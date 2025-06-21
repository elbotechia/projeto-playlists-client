import React, {createContext} from "react";
import { useFetch } from "../../hooks/useFetch";

export const TracksContext = createContext();
export const TracksProvider = ({ children }) => {
    
    const {tracks, isLoading, isError}= useFetch(
        "http://localhost:3003/api", "tracks", []);

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