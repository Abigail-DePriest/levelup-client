import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const EventCard = ({
  id,
  description,
  date,
  time,
  organizer,
  game,
}) => {
  const router = useRouter();

  const handleUpdate = () => {
    router.push(`/events/edit/${id}`);
  };

  return (
    <Card className="text-center">
      <Card.Header>{game.title}</Card.Header>
      <Card.Body>
        <Card.Title>On {date} at {time}</Card.Title>
        <Card.Text>Whats happening: {description}</Card.Text>
        <Button onClick={handleUpdate} style={{ width: '100px' }}>Edit Event</Button>
      </Card.Body>
      <Card.Footer className="text-muted">Organized by: {organizer.id}</Card.Footer>
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
};

export default EventCard;
