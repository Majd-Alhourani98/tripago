import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsPending(true);
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setIsPending(false);
    };

    getData();
  }, [url]);

  return { data, isPending };
};

export default useFetch;
