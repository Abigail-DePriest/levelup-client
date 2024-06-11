import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteEvent, joinEvent, leaveEvent } from '../utils/data/eventData';
import { useAuth } from '../utils/context/authContext';

function EventCard({ eventObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisEvent = () => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      deleteEvent(eventObj.id).then(() => onUpdate());
    }
  };

  const join = () => {
    joinEvent(eventObj.id, user.uid).then(() => onUpdate());
  };

  const leave = () => {
    leaveEvent(eventObj.id, user.uid).then(() => onUpdate());
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header>{eventObj.game}</Card.Header>
        <Card.Body>
          <Card.Title>Organized By: {eventObj.organizer}</Card.Title>
          <Card.Text>Event Details: {eventObj.description} </Card.Text>
          <Card.Text>Time: {eventObj.time} </Card.Text>
          <Card.Text>Date: {eventObj.date} </Card.Text>
          <Link href={`/events/edit/${eventObj.id}`} passHref>
            <Button variant="primary" className="m-2">
              Edit Event
            </Button>
          </Link>
          <Button variant="primary" className="m-2" onClick={deleteThisEvent}>
            Delete Event
          </Button>
          {
            eventObj.joined
              ? (<Button variant="primary" className="m-2" onClick={leave}>Leave</Button>)
              : (<Button variant="primary" className="m-2" onClick={join}> Join</Button>)
          }
        </Card.Body>
      </Card>
    </>
  );
}

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    game: PropTypes.number.isRequired,
    organizer: PropTypes.number.isRequired,
    joined: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
