import { Button } from 'react-bootstrap';
import GameForm from '../../components/GameForm';
import { useAuth } from '../../utils/context/authContext';

const NewGame = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Register New Game</h2>
      <GameForm user={user} />
    </div>
  );
};

export default NewGame;
