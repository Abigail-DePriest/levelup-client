import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateEvent, createEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  gameId: 1,
  description: '',
  date: '',
  time: '',
  userId: '',
};

function EventForm({ eventObj }) {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGames().then(setGames);

    if (eventObj.id) {
      setCurrentEvent({
        id: eventObj.id,
        gameId: eventObj.game,
        description: eventObj.description,
        date: eventObj.date,
        time: eventObj.time,
        userId: user.uid,
      });
    }
  }, [eventObj, user]);
  console.warn(currentEvent);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (eventObj.id) {
      const updatedEvent = {
        id: eventObj.id,
        gameId: Number(currentEvent.gameId),
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        userId: user.uid,
      };
      // Send POST request to your API
      updateEvent(updatedEvent, user.uid).then(() => router.push('/events/events'));
    } else {
      const event = {
        game: Number(currentEvent.gameId),
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        userId: user.uid,
      };
      createEvent(event, user.uid).then(() => router.push('/events/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
        </Form.Group>
        {/* TODO: create the rest of the input fields */}

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" required value={currentEvent.date} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control name="time" required value={currentEvent.time} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Game</Form.Label>
          <Form.Select name="gameId" value={currentEvent.gameId} onChange={handleChange}>
            <option value=""> Select a Game </option>
            {
              games.map((game) => (
                <option
                  key={game.id}
                  value={game.id}
                >
                  {game.title}
                </option>
              ))
            }
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  eventObj: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    game: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  }),
};

EventForm.defaultProps = {
  eventObj: initialState,
};

export default EventForm;
