import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import Main from '../../components/Main';
import Container from '../../components/Container';
import { Categories } from '../../components/Categories';
import { Map } from '../../components/Map';
import SpotCard from '../../components/SpotCard';
import { useSpots } from '../../hooks/SpotsContext';
import PageTitle from '../../components/PageTitle';
import { SearchInput } from '../../components/SearchInput';
import LoadingGate from '../../components/LoadingGate';
import LoadingCards from '../../components/LoadingCards';
import LoadingPills from '../../components/LoadingPills';

const TouristHotspots: React.FC = () => {
  const { spots, isLoading, categories, getSpots } = useSpots();

  useEffect(() => {
    getSpots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchText: string): void => {
    getSpots(searchText);
  };

  return (
    <>
      <Header />
      <LoadingGate
        waitFor={isLoading === false}
        meanwhile={
          <>
            <LoadingPills show numberOfCards={3} />
            <LoadingPills show numberOfCards={12} />
            <LoadingCards show numberOfCards={4} />
          </>
        }
      >
        <Main>
          <Container>
            <div className="row pt-3 pt-md-4 pb-4">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-4 mb-md-0">
                  <PageTitle title="Pontos Turísticos" />
                </div>
              </div>
              <div className="d-flex col-md-6 g-3">
                <div className="me-3">
                  <Map url="/pontos-turisticos/mapa" />
                </div>

                {/* <div className="d-flex col-md-6 justify-content-end">
              <Link to="/eventos/mapa">
                <div className="btn btn-primary my-4 me-3" title="Ver no mapa">
                  <FaMapMarkedAlt className="me-2 fs-4 text-white" />
                  Mapa
                </div>
              </Link> */}

                <SearchInput
                  onSearch={handleSearch}
                  placeholder="Buscar pontos turísticos"
                />
              </div>
            </div>
            <Categories
              categories={categories}
              url="pontos-turisticos"
              color="secondary"
            />
            {isLoading ? (
              <p>Carregando</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 ps-2">
                {spots.map(spot => {
                  return (
                    <div
                      key={spot.id}
                      className="col align-items-stretch d-flex"
                    >
                      <SpotCard spot={spot} />
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

export default TouristHotspots;
