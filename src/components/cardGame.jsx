function GameCard({ game, onSelect }) {
  return (
    <div
      onClick={() => onSelect(game)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <img
        src={game.thumbnail}
        alt={game.title}
        className="w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">{game.title}</h3>
        <span className="text-sm text-gray-400">{game.genre}</span>
      </div>
    </div>
  );
}

export default GameCard;
