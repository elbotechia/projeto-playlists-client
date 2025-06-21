import { createContext, useEffect, useState } from "react";
import { getToken } from "../../utils/utils";
export const TokenContext = createContext();

export const TokenProvider = ({children})=>{
    
    
    const [token, setToken] = useState(null);

    useEffect(() => {
        getToken(token, setToken);
    }, [token, setToken]);

    const values = {
        token,
        setToken
    }
    
    return (
        <TokenContext.Provider value={values}>
        {children}
        </TokenContext.Provider>
    );
}