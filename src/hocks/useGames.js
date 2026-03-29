import { useState, useEffect } from "react";

export function useGames(category) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    // O Vercel vai usar o vercel.json para completar o caminho.
    const url = category 
      ? `/api/games?category=${category}` 
      : `/api/games`;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          // Se cair aqui, o Vercel respondeu, mas a API da FreeToGame deu erro
          throw new Error("Erro ao buscar os jogos");
        }
        return res.json();
      })
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        // Se cair aqui, é erro de rede ou o proxy do vercel.json falhou
        console.error("Erro no Fetch:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [category]);

  return { games, loading, error };
}