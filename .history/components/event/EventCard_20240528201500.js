import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({
  time,
  organizer,
  description, //
  date,
  game,
}) => (
  <Card className="text-center">
    <Card.Header>{time}</Card.Header>
    <Card.Body>
      <Card.Title>By: {organizer}</Card.Title>
      <Card.Text>{description} players needed</Card.Text>
      <Card.Text>{date} </Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">Game: {game}</Card.Footer>
  </Card>
);

EventCard.propTypes = {
  time: PropTypes.string.isRequired,
  organizer: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  game: PropTypes.number.isRequired,
};

export default EventCard;
