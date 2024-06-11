import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/games`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createGame = (game) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gametypes.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getGames, createGame, getGameTypes };
