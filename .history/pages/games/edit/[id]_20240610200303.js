import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GameForm from '../../../components/GameForm';
import { getSingleGame } from '../../../utils/data/gameData';

export default function UpdateGame() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { user } = router.query;

  useEffect(() => {
    getSingleGame(user.uid).then(setEditItem);
  }, [user]);
  return (<GameForm obj={editItem} />);
}
