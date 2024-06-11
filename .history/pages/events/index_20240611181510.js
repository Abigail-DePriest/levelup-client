import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const updateCards = () => {
    getEvents(user.uid).then((data) => setEvents(data));
  };

  useEffect(() => {
    updateCards();
  }, []);

  return (
    <article className="events">
      <h1>Events</h1>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard eventObj={event} id={event.id} game={event.game} description={event.description} date={event.date} time={event.time} organizer={event.organizer} onUpdate={updateCards} joined={event.joined} />
        </section>
      ))}
    </article>
  );
}

export default Home;
