import { useCallback, useState } from "react";
import { RootState } from "store/store";
import { useAppSelector } from "./hooks";

interface SendRequest {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: any; // to be filled in
  headers?: any;
  reqAuth: boolean;
}

const useHttp = () => {
  const [isLoading, setIsloading] = useState<Boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const authHeader = useAppSelector((state: RootState) => state.auth.authHeader);

  const sendRequest = useCallback(
    async (options: SendRequest) => {
      setIsloading(true);
      setData(null);
      const { url, method, body, reqAuth } = options;

      // Default header
      let headers = {
        "Content-Type": "application/json",
      };
      // Sets headers if they are provided
      if (options?.headers) {
        headers = options.headers;
      }
      try {
        // Adds an authorisation token if required and one exists.
        if (reqAuth) {
          if (authHeader) {
            headers = { ...headers, ...authHeader };
          } else {
            throw Error("No authorisation token present");
          }
        }

        // Sends http request and parses responseData
        const res = await fetch(url, {
          method,
          body,
          headers,
        });
        const resData = await res.json();

        if (!res.ok) {
          throw new Error(resData.message || "Something went wrong!");
        }
        setData(resData);
      } catch (error: any) {
        setError(error.message);
      }

      setIsloading(false);
    },
    [authHeader]
  );

  return { sendRequest, isLoading, data, error };
};

export default useHttp;
