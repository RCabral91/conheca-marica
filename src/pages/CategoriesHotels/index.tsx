import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import Main from '../../components/Main';
import Container from '../../components/Container';
import { Map } from '../../components/Map';
import PageTitle from '../../components/PageTitle';
import { SearchInput } from '../../components/SearchInput';
import LoadingGate from '../../components/LoadingGate';
import LoadingCards from '../../components/LoadingCards';
import HotelCard from '../../components/HotelCard';
import { useHotels } from '../../hooks/HotelsContext';
import { setTitle } from '../../utils/title';

const HotelsByCategory: React.FC = () => {
  const { hotels, category, isLoading, getHotels, getHotelsByCategory } =
    useHotels();
  const { id } = useParams();
  useEffect(() => {
    getHotelsByCategory(parseInt(id ?? '', 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setTitle(`${category?.label ?? 'Loading...'} | Hotéis e Pousadas`);
  }, [category]);

  const handleSearch = (searchText: string): void => {
    getHotels(searchText);
  };

  return (
    <>
      <Header />
      <LoadingGate
        waitFor={isLoading === false}
        meanwhile={<LoadingCards show amount={4} />}
      >
        <Main>
          <Container>
            <div className="row pt-3 pt-md-4 pb-4">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-4 mb-md-0">
                  <PageTitle
                    title={category?.label ?? 'Carregando...'}
                    subtitle="Hotéis e Pousadas"
                    url="/hoteis-e-pousadas"
                  />
                </div>
              </div>
              <div className="d-flex col-md-6 g-3">
                <div className="me-3">
                  <Map url="/hoteis-e-pousadas/mapa" />
                </div>
                <div className="flex-grow-1">
                  <SearchInput
                    onSearch={handleSearch}
                    placeholder="Buscar hotéis e pousadas"
                  />
                </div>
              </div>
            </div>
            {isLoading ? (
              <p>Carregando</p>
            ) : (
              <div className="row row-cols-3 ps-2">
                {hotels.map(hotel => {
                  return (
                    <div
                      key={hotel.id}
                      className="col align-items-stretch d-flex"
                    >
                      <HotelCard hotel={hotel} />
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </Main>
      </LoadingGate>
      <Footer />
    </>
  );
};

export default HotelsByCategory;
