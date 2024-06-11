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
  game: 1,
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
    getEvents().then(setEvents);
  }, []);

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
      game: Number(currentEvent.game),
    };

    // Send POST request to your API
    createEvent(event).then(() => router.push('/events'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
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
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            required
            value={currentEvent.date}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            required
            value={currentEvent.time}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Organizer</Form.Label>
          <Form.Control name="organizer" required value={currentEvent.organizer} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Game</Form.Label>
          <Form.Control
            as="select"
            name="game"
            required
            value={currentEvent.game}
            onChange={handleChange}
          >
            <option value={1}>Game 1</option>
            <option value={2}>Game 2</option>
            <option value={3}>Game 3</option>
          </Form.Control>
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
    game: PropTypes.string.isRequired,

  }).isRequired,
};

export default EventForm;
