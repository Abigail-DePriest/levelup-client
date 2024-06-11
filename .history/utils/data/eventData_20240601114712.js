import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getEvents = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events.json`, {
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
export { getEvents };
