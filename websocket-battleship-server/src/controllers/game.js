const games = new Map();

export function handleAddShips(ws, data, id) {
  const { gameId, ships, indexPlayer } = JSON.parse(data);
  let game = games.get(gameId);

  console.log('handleAddShips');
  console.log(gameId, ships, indexPlayer);

  if (!game) {
    game = { players: [], ships: {} };
    games.set(gameId, game);
  }

  game.players[indexPlayer] = ws;

  game.ships[indexPlayer] = ships;

  if (Object.keys(game.ships).length === 2 && game.players.length === 2) {
    game.players.forEach((playerWs, index) => {
      playerWs.send(JSON.stringify({
        type: 'start_game',
        data: JSON.stringify({
          ships: game.ships[index],
          currentPlayerIndex: 0,
        }),
        id
      }));
    });
  }
}

export function handleAttack(ws, data, id) {
  const { gameId, x, y, indexPlayer } = JSON.parse(data);
  const game = games.get(gameId);
  if (!game) return;

  const opponentIndex = indexPlayer === 0 ? 1 : 0;
  const opponentShips = game.ships[opponentIndex];

  let status = 'miss';
  let killedShip = null;

  for (const ship of opponentShips) {
    const positions = [];
    for (let i = 0; i < ship.length; i++) {
      positions.push({
        x: ship.position.x + (ship.direction ? i : 0),
        y: ship.position.y + (!ship.direction ? i : 0),
      });
    }

    const hitIndex = positions.findIndex(pos => pos.x === x && pos.y === y);

    if (hitIndex !== -1) {
      if (!ship.hits) ship.hits = [];
      ship.hits.push({ x, y });

      if (ship.hits.length === ship.length) {
        status = 'killed';
        killedShip = ship;
      } else {
        status = 'shot';
      }

      break;
    }
  }

  game.players.forEach((playerWs, idx) => {
    playerWs.send(JSON.stringify({
      type: 'attack',
      data: {
        position: { x, y },
        currentPlayer: indexPlayer,
        status,
      },
      id
    }));
  });

  const allKilled = opponentShips.every(ship => ship.hits && ship.hits.length === ship.length);

  if (allKilled) {
    game.players.forEach((playerWs, idx) => {
      playerWs.send(JSON.stringify({
        type: 'finish',
        data: { winPlayer: indexPlayer },
        id
      }));
    });
    return;
  }

  const nextPlayer = opponentIndex;
  game.players[nextPlayer]?.send(JSON.stringify({
    type: 'turn',
    data: { indexPlayer: nextPlayer },
    id
  }));
}
