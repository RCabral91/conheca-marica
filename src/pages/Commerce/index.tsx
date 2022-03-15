import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import About from '../../components/About';
import { Categories } from '../../components/Categories';
import CommerceSlider from '../../components/CommerceSlider';
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
import { useCommerces } from '../../hooks/CommerceContext';

const Commerce: React.FC = () => {
  const { commerce, isLoading, setCommerce, getCommerce } = useCommerces();
  const { id } = useParams();
  useEffect(() => {
    setCommerce(null);
    getCommerce(parseInt(id ?? '', 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <LoadingGate
        waitFor={isLoading === false}
        meanwhile={<LoadingCards show numberOfCards={4} />}
      >
        <CommerceSlider images={commerce?.images} />
        <Main>
          <Container>
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="d-flex">
                    <PageTitle
                      title={commerce?.nome ?? 'Carregando...'}
                      subtitle="Comércio Local"
                      url="/comercios"
                    />
                  </div>
                  {commerce && (
                    <>
                      <Categories
                        categories={commerce.categorias}
                        url="comercios"
                        color="secondary"
                      />
                      <div className="mb-3 fs-5">
                        <p>{commerce.descricao_t}</p>
                      </div>

                      <About
                        title="Sobre"
                        addresses={commerce.addresses}
                        phones={commerce.phones}
                        email={commerce?.email}
                        network={commerce.redes}
                        openingTime={commerce.horario_funcionamento}
                      />

                      {Array.isArray(commerce?.estruturas) &&
                        commerce?.estruturas.length > 0 && (
                          <Informations
                            title="Estruturas"
                            contents={commerce.estruturas}
                          />
                        )}

                      {Array.isArray(commerce?.restricoes) &&
                        commerce?.restricoes.length > 0 && (
                          <Informations
                            title="Restrições"
                            contents={commerce.restricoes}
                          />
                        )}
                      {Array.isArray(commerce?.formas_pagamento) &&
                        commerce?.formas_pagamento.length > 0 && (
                          <Informations
                            title="Formas de Pagamento"
                            contents={commerce.formas_pagamento}
                          />
                        )}
                    </>
                  )}
                </div>
                <div className="col-4">
                  {commerce && <IframeMaps address={commerce.addresses} />}
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

export default Commerce;
