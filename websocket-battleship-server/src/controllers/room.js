const rooms = new Map();
let roomIdCounter = 1;

function getAllRoomsData() {
  return Array.from(rooms.entries()).map(([id, room]) => ({
    roomId: id,
    roomUsers: room.players.map((_, index) => ({
      name: `Player${index + 1}`,
      index,
    })),
  }));
}

export function handleCreateRoom(ws, data, id) {
  const roomId = roomIdCounter++;
  rooms.set(roomId, { players: [ws] });

  const roomData = getAllRoomsData();

  ws.send(JSON.stringify({
    type: 'update_room',
    data: JSON.stringify(roomData),
    id,
  }));
}

export function handleJoinRoom(ws, data, id) {
  const { indexRoom } = JSON.parse(data);
  const room = rooms.get(indexRoom);

  if (room && room.players.length === 1) {
    room.players.push(ws);
    room.players.forEach((playerWs, index) => {
      playerWs.send(JSON.stringify({ type: 'create_game', data: JSON.stringify({ idGame: indexRoom, idPlayer: index }), id }));
    });
  } else {
    ws.send(JSON.stringify({ type: 'error', data: JSON.stringify({ message: 'Комната недоступна' }), id }));
  }
}
