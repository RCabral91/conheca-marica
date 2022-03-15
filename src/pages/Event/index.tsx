import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import About from '../../components/About';
import { Categories } from '../../components/Categories';
import Container from '../../components/Container';
import { DownloadApp } from '../../components/DownloadApp';
import EntryValue from '../../components/EntryValue';
import EventSlider from '../../components/EventSlider';
import { Footer } from '../../components/Footer';
import IframeMaps from '../../components/GoogleMapReact';
import { Header } from '../../components/Header';
import Informations from '../../components/Informations';
import LoadingCards from '../../components/LoadingCards';
import LoadingGate from '../../components/LoadingGate';
import Main from '../../components/Main';
import PageTitle from '../../components/PageTitle';
import { useEvents } from '../../hooks/EventsContext';

export const getDate = (isoDate: string): string => {
  const isInvalid = new Date(isoDate).toString() === 'Invalid Date';
  if (isInvalid) return 'Invalid Date';

  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(isoDate));
};

const Event: React.FC = () => {
  const { event, isLoading, setEvent, getEvent } = useEvents();
  const { id } = useParams();
  useEffect(() => {
    setEvent(null);
    getEvent(parseInt(id ?? '', 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <LoadingGate
        waitFor={isLoading === false}
        meanwhile={<LoadingCards show numberOfCards={4} />}
      >
        <EventSlider images={event?.images} />
        <Main>
          <Container>
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="d-flex">
                    <PageTitle
                      title={event?.nome ?? 'Carregando...'}
                      subtitle="Eventos"
                      url="/eventos"
                    />
                  </div>
                  {event && (
                    <>
                      <Categories
                        categories={event.categorias}
                        url="eventos"
                        color="secondary"
                      />
                      <div className="fs-5">
                        De: {getDate(event?.datahora_inicio_f ?? '')}h
                      </div>
                      <div className="fs-5">
                        Até: {getDate(event?.datahora_fim_f ?? '')}h
                      </div>
                      {event.descricao_t && (
                        <div className="my-3 fs-5 flex-column">
                          <p>{event.descricao_t}</p>
                        </div>
                      )}
                      <About title="Sobre" addresses={event.addresses} />

                      {event?.preco_t && (
                        <EntryValue
                          title="Valor de Entrada"
                          priceToEntry={event.preco_t}
                          isFree={!!event.gratuito}
                        />
                      )}

                      {Array.isArray(event?.estruturas) &&
                        event?.estruturas.length > 0 && (
                          <Informations
                            title="Estruturas"
                            contents={event.estruturas}
                          />
                        )}
                      {Array.isArray(event?.restricoes) &&
                        event?.restricoes.length > 0 && (
                          <Informations
                            title="Restrições"
                            contents={event.restricoes}
                          />
                        )}
                      {Array.isArray(event?.formas_pagamento) &&
                        event?.formas_pagamento.length > 0 && (
                          <Informations
                            title="Formas de Pagamento"
                            contents={event.formas_pagamento}
                          />
                        )}
                    </>
                  )}
                </div>
                <div className="col-4">
                  {event && <IframeMaps address={event.addresses} />}
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

export default Event;
