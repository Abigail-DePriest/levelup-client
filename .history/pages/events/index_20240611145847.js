import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getEvents } from '../../utils/data/eventData';
import EventCard from '../../components/event/EventCard';

function EventPage() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  const getAllEvents = () => {
    getEvents().then((data) => setEvents(data));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <>
      <article className="events">
        <h1>Events</h1>
        {events.map((event) => (
          <section key={`event--${event.id}`} className="event">
            <EventCard description={event.description} date={event.date} time={event.time} organizer={event.organizer} game={event.game} id={event.id} />
          </section>
        ))}
      </article>
      <>
        <Button onClick={() => { router.push('/events/new'); }}>
          Register New Event
        </Button>
      </>
    </>
  );
}

export default EventPage;
