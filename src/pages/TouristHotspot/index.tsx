import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import About from '../../components/About';
import { Categories } from '../../components/Categories';
import Container from '../../components/Container';
import { DownloadApp } from '../../components/DownloadApp';
import EntryValue from '../../components/EntryValue';
import { Footer } from '../../components/Footer';
import IframeMaps from '../../components/GoogleMapReact';
import { Header } from '../../components/Header';
import Informations from '../../components/Informations';
import LoadingCards from '../../components/LoadingCards';
import LoadingGate from '../../components/LoadingGate';
import Main from '../../components/Main';
import PageTitle from '../../components/PageTitle';
import SpotSlider from '../../components/SpotSilder';
import Tips from '../../components/Tips';

import { useSpots } from '../../hooks/SpotsContext';

const TouristHotspot: React.FC = () => {
  const { spot, isLoading, setSpot, getSpot } = useSpots();
  const { id } = useParams();
  useEffect(() => {
    setSpot(null);
    getSpot(parseInt(id ?? '', 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <LoadingGate
        waitFor={isLoading === false}
        meanwhile={<LoadingCards show numberOfCards={4} />}
      >
        <SpotSlider images={spot?.images} />
        <Main>
          <Container>
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="d-flex">
                    <PageTitle
                      title={spot?.nome ?? 'Carregando...'}
                      subtitle="Pontos Turísticos"
                      url="/pontos-turisticos"
                    />
                  </div>
                  {spot && (
                    <>
                      <Categories
                        categories={spot.categorias}
                        url="/pontos"
                        color="secondary"
                      />
                      <div className="mb-3 fs-5">
                        <p>{spot.descricao_t}</p>
                      </div>

                      <About
                        title="Sobre"
                        addresses={spot.addresses}
                        phones={spot.phones}
                        email={spot?.email}
                        network={spot.redes}
                        openingTime={spot.horario_funcionamento}
                      />

                      {spot && spot?.dicas_t && (
                        <Tips title="Dicas" content={spot.dicas_t} />
                      )}

                      {spot && spot?.preco_t && (
                        <EntryValue
                          title="Valor de Entrada"
                          priceToEntry={spot.preco_t}
                        />
                      )}

                      {Array.isArray(spot?.viajantes) &&
                        spot?.viajantes.length > 0 && (
                          <Informations
                            title="Tipos de Viajantes"
                            contents={spot.viajantes}
                          />
                        )}

                      {Array.isArray(spot?.estruturas) &&
                        spot?.estruturas.length > 0 && (
                          <Informations
                            title="Estruturas"
                            contents={spot.estruturas}
                          />
                        )}
                      {Array.isArray(spot?.restricoes) &&
                        spot?.restricoes.length > 0 && (
                          <Informations
                            title="Restrições"
                            contents={spot.restricoes}
                          />
                        )}
                      {Array.isArray(spot?.formas_pagamento) &&
                        spot?.formas_pagamento.length > 0 && (
                          <Informations
                            title="Formas de Pagamento"
                            contents={spot.formas_pagamento}
                          />
                        )}
                    </>
                  )}
                </div>
                <div className="col-4">
                  {spot && <IframeMaps address={spot?.addresses} />}
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

export default TouristHotspot;
