import React, { useState } from "react";
import axios from "axios";

function CardAtleta({ atleta, adicionarFavorito }) {
  const { player, statistics } = atleta;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 12,
        margin: 8,
        width: 250,
        boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={player.photo}
        alt={player.name}
        style={{ width: "100%", borderRadius: 8 }}
      />
      <h3>{player.name}</h3>
      <p>
        <strong>Posição:</strong> {player.position || "N/A"}
      </p>
      <p>
        <strong>Nacionalidade:</strong> {player.nationality}
      </p>
      <p>
        <strong>Time:</strong> {statistics[0]?.team.name || "Não disponível"}
      </p>
      <button onClick={() => adicionarFavorito(atleta)}>Favoritar</button>
    </div>
  );
}

function PainelFavoritos({ favoritos }) {
  if (favoritos.length === 0)
    return <p>Você ainda não adicionou nenhum favorito.</p>;

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Favoritos</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {favoritos.map((atleta) => (
          <div
            key={atleta.player.id}
            style={{
              border: "1px solid #aaa",
              borderRadius: 6,
              margin: 5,
              padding: 10,
              width: 200,
            }}
          >
            <img
              src={atleta.player.photo}
              alt={atleta.player.name}
              style={{ width: "100%", borderRadius: 6 }}
            />
            <p>{atleta.player.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [nome, setNome] = useState("");
  const [resultados, setResultados] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [erro, setErro] = useState("");

  const buscarAtleta = async () => {
    if (!nome) return;

    const options = {
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/players?league=39&season=2020",
      params: { search: nome },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      if (response.data.results === 0) {
        setErro("Nenhum jogador encontrado.");
        setResultados([]);
      } else {
        setResultados(response.data.response);
        setErro("");
      }
    } catch (error) {
      console.error("Erro na busca:", error);
      setErro("Erro ao buscar jogador. Verifique o nome ou a chave da API.");
    }
  };

  const adicionarFavorito = (atleta) => {
    const jaExiste = favoritos.some(
      (fav) => fav.player.id === atleta.player.id
    );
    if (!jaExiste) {
      setFavoritos((prev) => [...prev, atleta]);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Busca de Jogadores de Futebol</h1>

      <input
        type="text"
        placeholder="Digite o nome do jogador (ex: Messi)"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ padding: 8, fontSize: 16 }}
      />
      <button
        onClick={buscarAtleta}
        style={{ marginLeft: 10, padding: 8, fontSize: 16 }}
      >
        Buscar
      </button>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 20 }}>
        {resultados.map((atleta) => (
          <CardAtleta
            key={atleta.player.id}
            atleta={atleta}
            adicionarFavorito={adicionarFavorito}
          />
        ))}
      </div>

      <PainelFavoritos favoritos={favoritos} />
    </div>
  );
}

export default App;