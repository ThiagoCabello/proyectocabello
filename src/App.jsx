import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import './App.css';

function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('/players.json')
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error('Error fetching players:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jugadores de Fútbol</h1>
      </header>

      <section className="player-list">
        {players.map((player) => (
          <div key={player.id} className="player-card">
            <Link to={`/player/${player.id}`}>
              <img src={player.image} alt={player.name} className="player-image" />
              <h2>{player.name}</h2>
              <p><strong>Equipo:</strong> {player.team}</p>
              <p><strong>Posición:</strong> {player.position}</p>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}

function PlayerDetail({ playerId }) {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetch('/players.json')
      .then((response) => response.json())
      .then((data) => {
        const foundPlayer = data.find((p) => p.id === parseInt(playerId));
        setPlayer(foundPlayer);
      })
      .catch((error) => console.error('Error fetching player details:', error));
  }, [playerId]);

  if (!player) {
    return <p>Jugador no encontrado.</p>;
  }

  return (
    <div className="player-detail">
      <h1>{player.name}</h1>
      <img src={player.image} alt={player.name} className="player-detail-image" />
      <p><strong>Equipo:</strong> {player.team}</p>
      <p><strong>Posición:</strong> {player.position}</p>
      <p><strong>Informacion:</strong> {player.bio}</p>
      <Link to="/" className="back-button">Volver a la lista de jugadores</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:id" element={<PlayerDetailPage />} />
      </Routes>
    </Router>
  );
}

function PlayerDetailPage() {
  const { id } = useParams();
  return <PlayerDetail playerId={id} />;
}

export default App;

