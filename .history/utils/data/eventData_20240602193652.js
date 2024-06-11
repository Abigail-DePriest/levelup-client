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

const createEvent = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});


// eslint-disable-next-line import/prefer-default-export
export { getEvents, createEvent };
