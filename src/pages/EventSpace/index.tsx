import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import About from '../../components/About';
import { Categories } from '../../components/Categories';
import Container from '../../components/Container';
import { DownloadApp } from '../../components/DownloadApp';
import Equipments from '../../components/Equipments';
import EventPlaceSlider from '../../components/EventPlaceSlider';
import { Footer } from '../../components/Footer';
import IframeMaps from '../../components/GoogleMapReact';
import { Header } from '../../components/Header';
import Informations from '../../components/Informations';
import LoadingCards from '../../components/LoadingCards';
import LoadingGate from '../../components/LoadingGate';
import Main from '../../components/Main';
import PageTitle from '../../components/PageTitle';
import Spaces from '../../components/Spaces';
import { useEventsSpaces } from '../../hooks/EventsSpaces';
import { setTitle } from '../../utils/title';

const EventSpace: React.FC = () => {
  const { eventSpace, isLoading, setEventSpace, getEventSpace } =
    useEventsSpaces();
  const { id } = useParams();
  useEffect(() => {
    setEventSpace(null);
    getEventSpace(parseInt(id ?? '', 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setTitle(`${eventSpace?.nome ?? 'Loading...'} | Espaços para Eventos`);
  }, [eventSpace]);
  return (
    <>
      <Header />
      <LoadingGate
        waitFor={isLoading === false}
        meanwhile={<LoadingCards show amount={4} />}
      >
        <EventPlaceSlider images={eventSpace?.images} />
        <Main>
          <Container>
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="d-flex">
                    <PageTitle
                      title={eventSpace?.nome ?? 'Carregando...'}
                      subtitle="Espaços para Eventos"
                      url="/espacos"
                    />
                  </div>
                  {eventSpace && (
                    <>
                      <Categories
                        categories={eventSpace.categorias}
                        url="/espacos"
                        color="secondary"
                      />
                      <div className="mb-3 fs-5">
                        <p>{eventSpace.descricao_t}</p>
                      </div>

                      <About
                        title="Sobre"
                        addresses={eventSpace.addresses}
                        phones={eventSpace.phones}
                        email={eventSpace?.email}
                        network={eventSpace.redes}
                        openingTime={eventSpace.horario_funcionamento}
                      />

                      {Array.isArray(eventSpace?.espacos) &&
                        eventSpace?.espacos.length > 0 && (
                          <Spaces
                            title="Espaços"
                            contents={eventSpace.espacos}
                          />
                        )}

                      {Array.isArray(eventSpace?.equipamentos) &&
                        eventSpace?.equipamentos.length > 0 && (
                          <Equipments
                            title="Equipamentos"
                            contents={eventSpace.equipamentos}
                          />
                        )}

                      {Array.isArray(eventSpace?.estruturas) &&
                        eventSpace?.estruturas.length > 0 && (
                          <Informations
                            title="Estruturas"
                            contents={eventSpace.estruturas}
                          />
                        )}
                      {Array.isArray(eventSpace?.restricoes) &&
                        eventSpace?.restricoes.length > 0 && (
                          <Informations
                            title="Restrições"
                            contents={eventSpace.restricoes}
                          />
                        )}
                      {Array.isArray(eventSpace?.formas_pagamento) &&
                        eventSpace?.formas_pagamento.length > 0 && (
                          <Informations
                            title="Formas de Pagamento"
                            contents={eventSpace.formas_pagamento}
                          />
                        )}
                    </>
                  )}
                </div>
                <div className="col-4">
                  {eventSpace && <IframeMaps address={eventSpace?.addresses} />}
                  <DownloadApp />
                </div>
              </div>
            </div>
          </Container>
        </Main>
      </LoadingGate>
      <Footer />
    </>
  );
};

export default EventSpace;
