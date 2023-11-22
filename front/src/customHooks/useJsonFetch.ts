import { useEffect, useRef, useState } from "react";

export type UseJsonType = [{ status: string } | undefined, boolean, boolean];

export default function useJsonFetch(url: string): UseJsonType {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState<boolean>(false);
  const timestampRef = useRef<number>();

  useEffect(() => {
    (async () => {
      const timestamp = Date.now();
      timestampRef.current = timestamp;
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setError(true);
          throw new Error(response.statusText);
        }
        if (!/^20./.test(`${response.status}`)) {
          setError(true);
        }

        const json = await response.json();
        if (!json) {
          setError(true);
        }
        if (timestampRef.current === timestamp) {
          setData(json);
        }
      } catch (e) {
        setError(true);
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return [data, isLoading, hasError];
}
