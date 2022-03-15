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
import { useEvents } from '../../hooks/EventsContext';
import EventCard from '../../components/EventCard';
import { setTitle } from '../../utils/title';

const EventsByCategory: React.FC = () => {
  const { events, category, isLoading, getEvents, getEventsByCategory } =
    useEvents();
  const { id } = useParams();
  useEffect(() => {
    getEventsByCategory(parseInt(id ?? '', 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setTitle(`${category?.label ?? 'Loading...'} | Eventos`);
  }, [category]);

  const handleSearch = (searchText: string): void => {
    getEvents(searchText);
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
                    subtitle="Eventos"
                    url="/eventos"
                  />
                </div>
              </div>
              <div className="d-flex col-md-6 g-3">
                <div className="me-3">
                  <Map url="/eventos" />
                </div>
                <div className="flex-grow-1">
                  <SearchInput
                    onSearch={handleSearch}
                    placeholder="Buscar eventos"
                  />
                </div>
              </div>
            </div>
            {isLoading ? (
              <p>Carregando</p>
            ) : (
              <div className="row row-cols-3 ps-2">
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

export default EventsByCategory;
