import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import Main from '../../components/Main';
import Container from '../../components/Container';
import { Categories } from '../../components/Categories';
import { Map } from '../../components/Map';
import PageTitle from '../../components/PageTitle';
import { SearchInput } from '../../components/SearchInput';
import LoadingGate from '../../components/LoadingGate';
import LoadingCards from '../../components/LoadingCards';
import EventCard from '../../components/EventCard';
import { useEvents } from '../../hooks/EventsContext';
import LoadingPills from '../../components/LoadingPills';
import { setTitle } from '../../utils/title';

const Events: React.FC = () => {
  const { events, isLoading, categories, getEvents } = useEvents();

  useEffect(() => {
    getEvents();
    setTitle('Eventos');
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchText: string): void => {
    getEvents(searchText);
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
                  <PageTitle title="Eventos" />
                </div>
              </div>
              <div className="d-flex col-md-6 g-3">
                <div className="me-3">
                  <Map url="/eventos/mapa" />
                </div>
                <div className="flex-grow-1">
                  <SearchInput
                    onSearch={handleSearch}
                    placeholder="Buscar eventos"
                  />
                </div>
              </div>
            </div>
            <Categories
              categories={categories}
              url="eventos"
              color="secondary"
            />
            {isLoading ? (
              <p>Carregando</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 ps-2">
                {events.map(event => {
                  return (
                    <div
                      key={event.id}
                      className="col align-items-stretch d-flex"
                    >
                      <EventCard event={event} />
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

export default Events;
