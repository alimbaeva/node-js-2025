const players = new Map();

function sendJson(ws, obj) {
  const json = JSON.stringify(obj);
  console.log('Sending JSON:', json);
  ws.send(json);
}

export function handleRegistration(ws, data, id) {
  const { name, password } = JSON.parse(data);

  if (!name || !password) {
    sendJson(ws, { type: 'reg', data: JSON.stringify({ error: true, errorText: 'Имя и пароль обязательны' }), id });
    return;
  }

  if (players.has(name)) {
    const player = players.get(name);
    if (player.password !== password) {
      sendJson(ws, { type: 'reg', data: JSON.stringify({ error: true, errorText: 'Неверный пароль' }), id });
      return;
    }
  } else {
    players.set(name, { password, ws });
  }

  sendJson(ws, { type: 'reg', data: JSON.stringify({ name, index: name, error: false, errorText: '' }), id });
}
