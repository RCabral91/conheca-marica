import { useEffect } from 'react';
import BigGoogleMap from '../../components/BigGoogleMap';
import { Header } from '../../components/Header';
import { usePubsNRests } from '../../hooks/PubsNRestsContext';

const MapOfPubsNRests: React.FC = () => {
  const { pubsNRests, getPubsNRests } = usePubsNRests();

  useEffect(() => {
    getPubsNRests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <BigGoogleMap
        items={pubsNRests}
        backTo="/bares-e-restaurantes"
        title="Bares e Restaurantes"
        type="pubNRest"
      />
    </>
  );
};

export default MapOfPubsNRests;
