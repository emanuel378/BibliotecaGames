import { useState, useEffect } from "react";
import GameCard from "./components/CardGame";
import GameDetail from "./components/gameDetail";

const categorias = ["shooter", "mmorpg", "strategy", "racing", "sports"];

function App() {
  const [games, setGames] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [search, setSearch] = useState("");
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase()),
  ); // verifica se o que eu pesquise tem algo parecido com o title dos games

  const url = category ? `/api/games?category=${category}` : `/api/games`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, [category]);

  // se tiver um jogo selecionado, mostra a tela de detalhe
  if (selectedGame) {
    return (
      <GameDetail game={selectedGame} onBack={() => setSelectedGame(null)} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Free to Play</h1>

      <div className="flex gap-3 mb-8 flex-wrap">
        <button
          onClick={() => setCategory("")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${
              category === ""
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
        >
          Todos
        </button>
        <input
          type="text"
          placeholder="Buscar jogo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-full border border-gray-200 text-sm outline-none focus:border-gray-400 transition-colors"
        />

        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors
              ${
                category === cat
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {games.length === 0 ? (
        <p className="text-gray-400">Carregando...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} onSelect={setSelectedGame} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
