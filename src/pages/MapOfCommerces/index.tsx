import { useEffect } from 'react';
import BigGoogleMap from '../../components/BigGoogleMap';
import { Header } from '../../components/Header';
import { useCommerces } from '../../hooks/CommerceContext';

const MapOfCommerces: React.FC = () => {
  const { commerces, getCommerces } = useCommerces();

  useEffect(() => {
    getCommerces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <BigGoogleMap
        items={commerces}
        backTo="/comercios"
        title="Comércio Local"
        type="commerce"
      />
    </>
  );
};

export default MapOfCommerces;
