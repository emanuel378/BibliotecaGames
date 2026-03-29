import { useState } from "react";
import GameCard from "./components/cardGame"; // Lembre de ajustar para PascalCase se renomear o arquivo!
import GameDetail from "./components/gameDetail";
import { useGames } from "./hocks/useGames"; // Importando o seu hook customizado

const categorias = ["shooter", "mmorpg", "strategy", "racing", "sports"];

function App() {
  const [category, setCategory] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [search, setSearch] = useState("");

  // 1. Usando o Hook: games, loading e error vêm prontos daqui
  const { games, loading, error } = useGames(category);

  
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedGame) {
    return (
      <GameDetail game={selectedGame} onBack={() => setSelectedGame(null)} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Free to Play</h1>

      {/* Filtros e Busca */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <button
          onClick={() => setCategory("")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${category === "" ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-100"}`}
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
              ${category === cat ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-100"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Exibição dos Dados */}
      {loading ? (
        <p className="text-gray-400 italic">Carregando catálogo...</p>
      ) : error ? (
        <p className="text-red-500 font-medium">Ops! Algo deu errado: {error}</p>
      ) : filteredGames.length === 0 ? (
        <p className="text-gray-500">Nenhum jogo encontrado com esse nome.</p>
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