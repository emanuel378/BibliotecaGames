function GameDetail({ game, onBack }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden shadow-sm">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full object-cover"
        />
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {game.title}
          </h1>
          <span className="text-sm text-gray-400">
            {game.genre} • {game.platform}
          </span>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {game.short_description}
          </p>

          <a
            href={game.game_url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Jogar agora
          </a>
          <br />
          <button
            onClick={onBack}
            className="mt-6 inline-block bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
