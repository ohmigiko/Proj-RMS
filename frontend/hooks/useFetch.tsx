import axios, { Method } from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

axios.defaults.baseURL = process.env.BACKEND_URL;

const useFetch = (
  method: Method,
  url: string,
  body: {},
  interval: boolean = false,
  trigger: boolean = false
) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${localStorage.token}` };
    if (!router.isReady) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resp = await axios.request({
          method: method,
          url: url,
          data: body,
          headers,
        });
        const data = await resp?.data;
        setApiData(data);
      } catch (err) {
        if (err.response?.status === 401) {
          router.push("/login");
        }
        setServerError(err);
      }
      setIsLoading(false);
    };
    if (interval) {
      fetchData();
    } else {
      fetchData();
    }
  }, [router.isReady, url, trigger]);

  return { isLoading, apiData, serverError };
};

export default useFetch;
