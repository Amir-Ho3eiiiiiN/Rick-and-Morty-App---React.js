import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(url, query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await axios.get(`${url}=${query}`, { signal });
        // if (!res.ok) throw new Error("something went wrong");
        setCharacters(res.data.results.slice(0, 5));
      } catch (err) {
        // if (err.name !== "AbortError") {
        //   toast.error(err.response.data.error);
        // }
        if (!axios.isCancel()) {
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    // if (query.length < 3) return;
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);

  return { isLoading, characters };
}
