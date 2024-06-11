import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateGame, getGameTypes, createGame } from '../../utils/data/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

function GameForm({ gameObj }) {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGameTypes().then(setGameTypes);

    if (gameObj.id) {
      setCurrentGame({
        id: gameObj.id,
        maker: gameObj.maker,
        title: gameObj.title,
        numberOfPlayers: gameObj.number_of_players,
        skillLevel: gameObj.skill_level,
        gameTypeId: gameObj.game_type,
        userId: user.uid,
      });
    }
  }, [gameObj, user]);

  console.warn(currentGame);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (gameObj.id) {
      const updatedGame = {
        id: gameObj.id,
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameTypeId),
        userId: user.uid,
      };
      updateGame(updatedGame, user.uid).then(() => router.push('/games/games'));
    } else {
      const game = {
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameTypeId),
        userId: user.uid,
      };
      createGame(game, user.uid).then(() => router.push('/games/games'));
    }
  };
  // Send POST request to your API

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>
        {/* TODO: create the rest of the input fields */}

        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Game Type</Form.Label>
          <Form.Select name="gameTypeId" value={currentGame.gameTypeId} onChange={handleChange}>
            <option value=""> Select a Game Type</option>
            {
              gameTypes.map((type) => (
                <option
                  key={type.id}
                  value={type.id}
                >
                  {type.label}
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

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    number_of_players: PropTypes.number,
    skill_level: PropTypes.number,
    maker: PropTypes.string,
    title: PropTypes.string,
    game_type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }),
};

GameForm.defaultProps = {
  gameObj: initialState,
};

export default GameForm;
