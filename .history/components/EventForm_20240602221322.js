import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent, getEvents } from '../utils/data/eventData';

const initialState = {
  description: '',
  date: 0,
  time: '',
  organizer: '',
  gameId: 1,
};

const EventForm = ({ user }) => {
  const [events, setEvents] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getEvents(user.uid).then(setEvents);

    if (user.uid) setCurrentEvent(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const event = {
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      organizer: currentEvent.organizer,
      gameId: Number(currentEvent.game_id),
      gamerId: user.uid,
    };

    // Send POST request to your API
    createEvent(event).then(() => router.push('/events'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="title" required value={currentEvent.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            required
            value={currentEvent.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control
            type="number"
            name="numberOfPlayers"
            required
            value={currentEvent.numberOfPlayers}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control
            type="number"
            name="skillLevel"
            required
            value={currentEvent.skillLevel}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Game Type</Form.Label>
          <Form.Control
            type="number"
            name="gameTypeId"
            required
            value={currentEvent.gameTypeId}
            onChange={handleChange}
          />
        </Form.Group>
        {/* TODO: create the rest of the input fields */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    organizer: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired,
    gamerId: PropTypes.string.isRequired,

  }).isRequired,
};

export default EventForm;
