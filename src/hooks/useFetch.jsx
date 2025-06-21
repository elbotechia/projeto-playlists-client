
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API } from "../common/CONSTANTS/CONSTANTS";

export const useFetch = (BASE_URL = BASE_API, path = "", initialState = null) => {
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);
  const url = `${BASE_URL}/${path}`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(error);
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};