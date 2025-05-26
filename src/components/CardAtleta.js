import React from 'react';

const CardAtleta = ({ atleta, adicionarFavorito }) => {
  const jogador = atleta.player;
  const time = atleta.statistics[0]?.team;

  return (
    <div style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
      <h3>{jogador.name}</h3>
      <img
        src={jogador.photo}
        alt={jogador.name}
        width="100"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/100'; }}
      />
      <p>Idade: {jogador.age}</p>
      <p>Time: {time?.name || 'Desconhecido'}</p>
      <p>Posição: {jogador.position}</p>
      <button onClick={() => adicionarFavorito(atleta)}>Adicionar aos favoritos</button>
    </div>
  );
};

export default CardAtleta;
