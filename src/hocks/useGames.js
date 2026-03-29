import { useState, useEffect } from "react";
//Aqui a gente colocou so a parte logica do hoock
export function useGames(category) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define a URL (usando a sua lógica de categoria)
   const url = category 
  ? `https://www.freetogame.com/api/games?category=${category}` 
  : `https://www.freetogame.com/api/games`;
    // Reseta o loading e o erro antes de começar uma nova busca
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar os jogos");
        }
        return res.json();
      })
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [category]); // O hook "escuta" a categoria: se ela mudar, ele busca de novo.

  // Retornamos um objeto com tudo o que o componente App.jsx vai precisar
  return { games, loading, error };
}