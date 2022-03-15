import { useEffect } from 'react';
import BigGoogleMap from '../../components/BigGoogleMap';
import { Header } from '../../components/Header';
import { useSpots } from '../../hooks/SpotsContext';

const MapOfSpots: React.FC = () => {
  const { spots, getSpots } = useSpots();

  useEffect(() => {
    getSpots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <BigGoogleMap
        items={spots}
        backTo="/pontos-turisticos"
        title="Pontos Turísticos"
        type="spot"
      />
    </>
  );
};

export default MapOfSpots;
