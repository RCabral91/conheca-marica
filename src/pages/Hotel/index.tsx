import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import About from '../../components/About';
import Accommodation from '../../components/Accommodation';
import { Categories } from '../../components/Categories';
import Container from '../../components/Container';
import { DownloadApp } from '../../components/DownloadApp';
import { Footer } from '../../components/Footer';
import IframeMaps from '../../components/GoogleMapReact';
import { Header } from '../../components/Header';
import HotelSlider from '../../components/HotelSlider';
import Informations from '../../components/Informations';
import LoadingCards from '../../components/LoadingCards';
import LoadingGate from '../../components/LoadingGate';
import Main from '../../components/Main';
import PageTitle from '../../components/PageTitle';
import { useHotels } from '../../hooks/HotelsContext';
import { setTitle } from '../../utils/title';

const Hotel: React.FC = () => {
  const { hotel, isLoading, setHotel, getHotel } = useHotels();
  const { id } = useParams();
  useEffect(() => {
    setHotel(null);
    getHotel(parseInt(id ?? '', 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setTitle(`${hotel?.nome ?? 'Loading...'} | Hotéis e Pousadas`);
  }, [hotel]);
  return (
    <>
      <Header />
      <LoadingGate
        waitFor={isLoading === false}
        meanwhile={<LoadingCards show amount={4} />}
      >
        <HotelSlider images={hotel?.images} />
        <Main>
          <Container>
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="d-flex">
                    <PageTitle
                      title={hotel?.nome ?? 'Carregando...'}
                      subtitle="Hotéis e Pousadas"
                      url="/hoteis-e-pousadas"
                    />
                  </div>
                  {hotel && (
                    <>
                      <Categories
                        categories={hotel.categorias}
                        url="hoteis-e-pousadas"
                        color="secondary"
                      />
                      <div className="mb-3 fs-5">
                        <p>{hotel.descricao_t}</p>
                      </div>

                      <About
                        title="Sobre"
                        addresses={hotel.addresses}
                        phones={hotel.phones}
                        email={hotel?.email}
                        site={hotel?.site}
                        network={hotel.redes}
                      />

                      <Accommodation
                        title="Comodidades"
                        quartos={hotel.quartos}
                        leitos={hotel.leitos}
                        cafe_manha={hotel.cafe_manha}
                        cafe_hospedes={hotel.cafe_hospedes}
                        almoco={hotel.almoco}
                        almoco_hospedes={hotel.almoco_hospedes}
                        jantar={hotel.jantar}
                        jantar_hospedes={hotel.jantar_hospedes}
                      />

                      {Array.isArray(hotel?.estruturas) &&
                        hotel?.estruturas.length > 0 && (
                          <Informations
                            title="Estruturas"
                            contents={hotel.estruturas}
                          />
                        )}
                      {Array.isArray(hotel?.restricoes) &&
                        hotel?.restricoes.length > 0 && (
                          <Informations
                            title="Restrições"
                            contents={hotel.restricoes}
                          />
                        )}
                      {Array.isArray(hotel?.formas_pagamento) &&
                        hotel?.formas_pagamento.length > 0 && (
                          <Informations
                            title="Formas de Pagamento"
                            contents={hotel.formas_pagamento}
                          />
                        )}
                    </>
                  )}
                </div>
                <div className="col-4">
                  {hotel && <IframeMaps address={hotel?.addresses} />}
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

export default Hotel;
