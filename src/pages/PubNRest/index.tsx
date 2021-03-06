import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import About from '../../components/About';
import { Categories } from '../../components/Categories';
import Container from '../../components/Container';
import { DownloadApp } from '../../components/DownloadApp';
import { Footer } from '../../components/Footer';
import IframeMaps from '../../components/GoogleMapReact';
import { Header } from '../../components/Header';
import Informations from '../../components/Informations';
import LoadingCards from '../../components/LoadingCards';
import LoadingGate from '../../components/LoadingGate';
import Main from '../../components/Main';
import PageTitle from '../../components/PageTitle';
import { PriceRange } from '../../components/PriceRange';
import SpotSlider from '../../components/SpotSlider';
import { usePubsNRests } from '../../hooks/PubsNRestsContext';
import { setTitle } from '../../utils/title';

const PubNRest: React.FC = () => {
  const { pubNRest, isLoading, setPubNRest, getPubNRest } = usePubsNRests();
  const { id } = useParams();
  useEffect(() => {
    setPubNRest(null);
    getPubNRest(parseInt(id ?? '', 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setTitle(`${pubNRest?.nome ?? 'Loading...'} | Bares e Restaurantes`);
  }, [pubNRest]);
  return (
    <>
      <Header />
      <LoadingGate
        waitFor={isLoading === false}
        meanwhile={<LoadingCards show amount={4} />}
      >
        <SpotSlider images={pubNRest?.images} />
        <Main>
          <Container>
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="d-flex">
                    <PageTitle
                      title={pubNRest?.nome ?? 'Carregando...'}
                      subtitle="Bares e Restaurantes"
                      url="/bares-e-restaurantes"
                    />
                  </div>
                  {pubNRest && (
                    <>
                      <Categories
                        categories={pubNRest.categorias}
                        url="bares-e-restaurantes"
                        color="secondary"
                      />
                      <div className="mb-3 fs-5">
                        <p>{pubNRest.descricao_t}</p>
                      </div>

                      <About
                        title="Sobre"
                        addresses={pubNRest.addresses}
                        phones={pubNRest.phones}
                        email={pubNRest?.email}
                        site={pubNRest?.site}
                        network={pubNRest.redes}
                        openingTime={pubNRest.horario_funcionamento}
                      />

                      {pubNRest && pubNRest?.faixa_preco && (
                        <PriceRange
                          title="Faixa de Pre??o"
                          amount={pubNRest.faixa_preco}
                        />
                      )}

                      {Array.isArray(pubNRest?.refeicoes) &&
                        pubNRest?.refeicoes.length > 0 && (
                          <Informations
                            title="Refei????es"
                            contents={pubNRest.refeicoes}
                          />
                        )}

                      {Array.isArray(pubNRest?.cozinhas) &&
                        pubNRest?.cozinhas.length > 0 && (
                          <Informations
                            title="Cozinhas"
                            contents={pubNRest.cozinhas}
                          />
                        )}

                      {Array.isArray(pubNRest?.estruturas) &&
                        pubNRest?.estruturas.length > 0 && (
                          <Informations
                            title="Estruturas"
                            contents={pubNRest.estruturas}
                          />
                        )}
                      {Array.isArray(pubNRest?.restricoes) &&
                        pubNRest?.restricoes.length > 0 && (
                          <Informations
                            title="Restri????es"
                            contents={pubNRest.restricoes}
                          />
                        )}
                      {Array.isArray(pubNRest?.formas_pagamento) &&
                        pubNRest?.formas_pagamento.length > 0 && (
                          <Informations
                            title="Formas de Pagamento"
                            contents={pubNRest.formas_pagamento}
                          />
                        )}
                    </>
                  )}
                </div>
                <div className="col-4">
                  {pubNRest && <IframeMaps address={pubNRest?.addresses} />}
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

export default PubNRest;
