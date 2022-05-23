import { useState, useEffect } from "react";
import axios from "axios";

import { useFetchType } from "./useFetch.props";

const useFetch = (url: string): useFetchType => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<{ [key: string]: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<{ [key: string]: string }>({});

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) return;

    axios(url, options)
      .then((res) => {
        setIsLoading(false);
        setResponse(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data);
      });
    // eslint-disable-next-line
  }, [isLoading]);

  return [{ response, isLoading, error }, doFetch];
};

export default useFetch;
