import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const GameCard = ({
  id,
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  gameType,
}) => {
  const router = useRouter();

  const handleUpdate = () => {
    router.push(`/games/edit/${id}`);
  };

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>{gameType.label} By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed
        </Card.Text>
        <Button onClick={handleUpdate} style={{ width: '100px' }}>Edit Game</Button>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
    </Card>
  );
};

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  gameType: PropTypes.string.isRequired,
};

export default GameCard;
