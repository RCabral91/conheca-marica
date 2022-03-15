import { useEffect } from 'react';
import { useEventsSpaces } from '../../hooks/EventsSpaces';
import EventSpaceCard from '../../components/EventSpaceCard';
import { Header } from '../../components/Header';
import LoadingGate from '../../components/LoadingGate';
import LoadingCards from '../../components/LoadingCards';
import Main from '../../components/Main';
import Container from '../../components/Container';
import PageTitle from '../../components/PageTitle';
import { Map } from '../../components/Map';
import { SearchInput } from '../../components/SearchInput';
import { Categories } from '../../components/Categories';
import { Footer } from '../../components/Footer';
import LoadingPills from '../../components/LoadingPills';
import { setTitle } from '../../utils/title';

const EventsSpaces: React.FC = () => {
  const { eventsSpaces, isLoading, categories, getEventsSpaces } =
    useEventsSpaces();

  useEffect(() => {
    getEventsSpaces();
    setTitle('Espaços para Eventos');
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchText: string): void => {
    getEventsSpaces(searchText);
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
                  <PageTitle title="Espaços para Eventos" />
                </div>
              </div>
              <div className="d-flex col-md-6 g-3">
                <div className="me-3">
                  <Map url="/espacos/mapa" />
                </div>
                <div className="flex-grow-1">
                  <SearchInput
                    onSearch={handleSearch}
                    placeholder="Buscar espaços para eventos"
                  />
                </div>
              </div>
            </div>
            <Categories
              categories={categories}
              url="espacos"
              color="secondary"
            />
            {isLoading ? (
              <p>Carregando</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 ps-2">
                {eventsSpaces.map(eventSpace => {
                  return (
                    <div
                      key={eventSpace.id}
                      className="col align-items-stretch d-flex"
                    >
                      <EventSpaceCard eventSpace={eventSpace} />
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

export default EventsSpaces;
