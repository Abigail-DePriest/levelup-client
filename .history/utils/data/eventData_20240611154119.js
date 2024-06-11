// import { clientCredentials } from '../client';

const endpoint = 'http://localhost:8000';

// utils/data/eventData.js
export const getEvents = async () => {
  try {
    const response = await fetch(`${endpoint}/events`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Should return an array of events
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

const createEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateEvent = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(() => resolve())
    .catch(reject);
});

const deleteEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const joinEvent = (eventId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${eventId}/signup`, {
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

const leaveEvent = (eventId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${eventId}/leave`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createEvent, getEvents, updateEvent, getSingleEvent, deleteEvent,
  joinEvent, leaveEvent,
};
