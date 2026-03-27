import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import CardGame from './components/CardGame'

function App() {
  const [games, setGames] = useState([])
  const API_KEY = 'bf218c5015344fb99622a8ad0581161ea'

  // 1. Função de busca usando .then()
  const fetchGames = (search = '') => {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${search}&page_size=12`
    
    fetch(url)
      .then(response => response.json()) 
      .then(data => setGames(data.results))
  }

  
  useEffect(() => {
    fetchGames()
  }, [])

  return (
    <div className="bg-slate-950 min-h-screen text-white p-5">
      {}
      <Navbar onSearch={fetchGames} />

      <main className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {}
          {games.map(item => (
            <CardGame key={item.id} game={item} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App