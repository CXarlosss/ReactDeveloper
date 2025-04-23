import { useEffect, useState } from "react";

const API_KEY = "f7c53cdf42767e5a41eccd4b61a4cb77";

export const useFetch = (apiPath, queryTerm = "") => {
  const [data, setData] = useState([]);

  const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${API_KEY}&query=${queryTerm}`;

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json.results || []); // importante para evitar undefined
      } catch (error) {
        console.error("Error al hacer fetch:", error);
        setData([]); // fallback seguro
      }
    }

    fetchMovies();
  }, [url]);

  return { data };
};
