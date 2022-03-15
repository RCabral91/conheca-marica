import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import Main from '../../components/Main';
import Container from '../../components/Container';
import { Categories } from '../../components/Categories';
import { Map } from '../../components/Map';
import PageTitle from '../../components/PageTitle';
import { SearchInput } from '../../components/SearchInput';
import { usePubsNRests } from '../../hooks/PubsNRestsContext';
import PubNRestCard from '../../components/PubNRestCard';
import LoadingGate from '../../components/LoadingGate';
import LoadingCards from '../../components/LoadingCards';
import LoadingPills from '../../components/LoadingPills';

const PubsNRests: React.FC = () => {
  const { pubsNRests, isLoading, categories, getPubsNRests } = usePubsNRests();

  useEffect(() => {
    getPubsNRests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchText: string): void => {
    getPubsNRests(searchText);
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
                  <PageTitle title="Bares e Restaurantes" />
                </div>
              </div>
              <div className="d-flex col-md-6 g-3">
                <div className="me-3">
                  <Map />
                </div>
                <div className="input input-display">
                  <SearchInput
                    onSearch={handleSearch}
                    placeholder="Buscar bares e restaurantes"
                  />
                </div>
              </div>
            </div>
            <Categories
              categories={categories}
              url="bares-e-restaurantes"
              color="secondary"
            />
            {isLoading ? (
              <p>Carregando</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 ps-2">
                {pubsNRests.map(pubNRest => {
                  return (
                    <div
                      key={pubNRest.id}
                      className="col align-items-stretch d-flex"
                    >
                      <PubNRestCard pubNRest={pubNRest} />
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

export default PubsNRests;
