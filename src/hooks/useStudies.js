import { useState, useEffect } from "react";

import { BASE_URL } from "../../constants/api.js";

export function useStudies({ keyword, sort, page, limit }) {
  const [studies, setStudies] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStudies() {
      setIsLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams({
          keyword,
          sort,
          page,
          limit,
        }).toString();
        const response = await fetch(`${BASE_URL}/studies?${query}`);

        if (!response.ok) throw new Error("불러오기 실패");

        const { data, totalCount } = await response.json();
        if (page === 1) {
          setStudies(data);
        } else {
          setStudies((prev) => [...prev, ...data]);
        }
        setTotalCount(totalCount);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStudies();
  }, [keyword, sort, page, limit]);
  return { studies, totalCount, isLoading, error };
}
