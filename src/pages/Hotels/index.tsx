import { useEffect } from 'react';
import { Categories } from '../../components/Categories';
import Container from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import HotelCard from '../../components/HotelCard';
import LoadingCards from '../../components/LoadingCards';
import LoadingGate from '../../components/LoadingGate';
import LoadingPills from '../../components/LoadingPills';
import Main from '../../components/Main';
import { Map } from '../../components/Map';
import PageTitle from '../../components/PageTitle';
import { SearchInput } from '../../components/SearchInput';
import { useHotels } from '../../hooks/HotelsContext';
import { setTitle } from '../../utils/title';

const Hotels: React.FC = () => {
  const { hotels, isLoading, categories, getHotels } = useHotels();

  useEffect(() => {
    getHotels();
    setTitle('Hotéis e Pousadas');
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchText: string): void => {
    getHotels(searchText);
  };

  return (
    <>
      <Header />
      <LoadingGate
        waitFor={isLoading === false}
        meanwhile={
          <>
            <LoadingPills show amount={10} />
            <LoadingCards show amount={4} />
          </>
        }
      >
        <Main>
          <Container>
            <div className="row pt-3 pt-md-4 pb-4">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-4 mb-md-0">
                  <PageTitle title="Hotéis e Pousadas" />
                </div>
              </div>
              <div className="d-flex col-md-6">
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
            <Categories
              categories={categories}
              url="hoteis-e-pousadas"
              color="secondary"
            />
            {isLoading ? (
              <p>Carregando</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 ps-2">
                {hotels.map(hotel => {
                  return (
                    <div
                      key={hotel.id}
                      className="col d-flex align-items-stretch"
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

export default Hotels;
