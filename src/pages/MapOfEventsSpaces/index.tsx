import { useEffect } from 'react';
import BigGoogleMap from '../../components/BigGoogleMap';
import { Header } from '../../components/Header';
import { useEventsSpaces } from '../../hooks/EventsSpaces';

const MapOfEventsSpaces: React.FC = () => {
  const { eventsSpaces, getEventsSpaces } = useEventsSpaces();

  useEffect(() => {
    getEventsSpaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <BigGoogleMap
        items={eventsSpaces}
        backTo="/eventos"
        title="Espaços para Eventos"
        type="event"
      />
    </>
  );
};

export default MapOfEventsSpaces;
