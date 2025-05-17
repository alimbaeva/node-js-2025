const rooms = new Map();
let roomIdCounter = 1;

export function handleCreateRoom(ws, data, id) {
  const roomId = roomIdCounter++;
  rooms.set(roomId, { players: [ws] });

  ws.send(JSON.stringify({ type: 'update_room', data: JSON.stringify(Array.from(rooms.entries()).map(([id, room]) => ({ roomId: id, roomUsers: room.players.map((p, index) => ({ name: `Player${index + 1}`, index })) }))), id }));
}
