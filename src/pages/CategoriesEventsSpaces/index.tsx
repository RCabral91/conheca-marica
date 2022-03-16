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
import EventSpaceCard from '../../components/EventSpaceCard';
import { useEventsSpaces } from '../../hooks/EventsSpaces';
import { setTitle } from '../../utils/title';

const EventsSpacesByCategory: React.FC = () => {
  const {
    eventsSpaces,
    category,
    isLoading,
    getEventsSpaces,
    getEventsSpacesByCategory,
  } = useEventsSpaces();
  const { id } = useParams();
  useEffect(() => {
    getEventsSpacesByCategory(parseInt(id ?? '', 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setTitle(`${category?.label ?? 'Loading...'} | Espaços para Eventos`);
  }, [category]);

  const handleSearch = (searchText: string): void => {
    getEventsSpaces(searchText);
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
                    subtitle="Espaços para Eventos"
                    url="/espacos"
                  />
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
            {isLoading ? (
              <p>Carregando</p>
            ) : (
              <div className="row row-cols-3 ps-2">
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

export default EventsSpacesByCategory;
