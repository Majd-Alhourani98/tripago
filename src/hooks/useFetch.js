import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      setIsPending(true);
      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const json = await response.json();
        setData(json);
        setIsPending(false);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(
            "Fetch was aborted (component unmounted or URL changed)."
          );
        } else {
          setError("Could not fetch the data");
          setIsPending(false);
          console.log("Fetch error: ", error.message);
        }
      }
    };

    getData();

    return () => {
      console.log("Fetch cleanup: Aborting ongoing request");
      controller.abort();
    };
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
