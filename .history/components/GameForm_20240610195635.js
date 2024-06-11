import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, updateGame, getGameTypes } from '../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 1,
};

const GameForm = ({ user, gameObj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  const gameTypeSel = () => {
    getGameTypes().then(setGameTypes);
  };

  useEffect(() => {
    gameTypeSel();
  }, []);

  useEffect(() => {
    if (gameObj?.id) {
      setCurrentGame({
        skillLevel: gameObj.skill_level,
        numberOfPlayers: gameObj.number_of_players,
        title: gameObj.title,
        maker: gameObj.maker,
        gameTypeId: gameObj.game_type.id,
      });
    }
  }, [gameObj]);

  const handleChange = (e) => {
    // TODO complete on change func
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.number_of_players),
      skillLevel: Number(currentGame.skillLevel),
      gameType: Number(currentGame.gameTypeId),
      userId: user.uid,
    };

    // send POST to api
    if (gameObj?.id) {
      game.id = gameObj.id;
      updateGame(game).then(() => router.push('/games'));
    } else {
      createGame(game).then(() => router.push('/games'));
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control
            name="maker"
            required
            value={currentGame.maker}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control
            type="number"
            name="numberOfPlayers"
            required
            value={currentGame.number_of_players}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control
            type="number"
            name="skillLevel"
            required
            value={currentGame.skillLevel}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Game Type</Form.Label>
          <Form.Control
            as="select"
            name="gameTypeId"
            required
            value={currentGame.game_type.id}
            onChange={handleChange}
          >
            <option value="">Select a game type</option>
            {gameTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
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

GameForm.propTypes = {
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    skillLevel: PropTypes.number,
    numberOfPlayers: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    gameTypeId: PropTypes.number,
    skill_level: PropTypes.number,
    number_of_players: PropTypes.number,
    game_type: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};

export default GameForm;
