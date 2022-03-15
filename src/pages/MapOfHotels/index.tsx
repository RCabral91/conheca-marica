import { useEffect } from 'react';
import BigGoogleMap from '../../components/BigGoogleMap';
import { Header } from '../../components/Header';
import { useHotels } from '../../hooks/HotelsContext';

const MapOfHotels: React.FC = () => {
  const { hotels, getHotels } = useHotels();

  useEffect(() => {
    getHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <BigGoogleMap
        items={hotels}
        backTo="/hoteis-e-pousadas"
        title="Hotéis e Pousadas"
        type="hotel"
      />
    </>
  );
};

export default MapOfHotels;
