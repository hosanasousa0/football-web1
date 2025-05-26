import React from 'react';

const PainelFavoritos = ({ favoritos }) => {
  return (
    <div style={{ marginTop: 30 }}>
      <h2>Favoritos</h2>

      {favoritos.length === 0 ? (
        <p>Nenhum favorito ainda.</p>
      ) : (
        favoritos.map((atleta, index) => {
          const jogador = atleta.player;
          return (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <img
                src={jogador.photo}
                alt={jogador.name}
                width="50"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
              />
              <div>
                <h4 style={{ margin: 0 }}>{jogador.name}</h4>
                <p style={{ margin: 0 }}>Idade: {jogador.age}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PainelFavoritos;
