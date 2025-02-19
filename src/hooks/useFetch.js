import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const places = await fetchFn();
        setData(places);
        setIsLoading(false);
      } catch (err) {
        setError({ message: err.message || "Fail to fetch. Try again 🔥!" });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return { data, setData, isLoading, error };
}
