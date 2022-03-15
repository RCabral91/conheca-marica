import { useEffect } from 'react';
import BigGoogleMap from '../../components/BigGoogleMap';
import { Header } from '../../components/Header';
import { useEvents } from '../../hooks/EventsContext';

const MapOfEvents: React.FC = () => {
  const { events, getEvents } = useEvents();

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <BigGoogleMap
        items={events}
        backTo="/eventos"
        title="Eventos"
        type="event"
      />
    </>
  );
};

export default MapOfEvents;
