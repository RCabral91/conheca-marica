import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import About from '../../components/About';
import Breadcrumb from '../../components/Breadcrumb';
import { Categories } from '../../components/Categories';
import Container from '../../components/Container';
import { DownloadApp } from '../../components/DownloadApp';
import EntryValue from '../../components/EntryValue';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import Informations from '../../components/Informations';

import Main from '../../components/Main';
import PageTitle from '../../components/PageTitle';
import Tips from '../../components/Tips';
import { useHotels } from '../../hooks/HotelsContext';

const breadcrumbData = [
  {
    title: 'Hotéis e Pousadas',
    backTo: '/hoteis-e-pousadas',
  },
];

const Hotel: React.FC = () => {
  const { hotel, setHotel, getHotel } = useHotels();
  const { id } = useParams();
  useEffect(() => {
    setHotel(null);
    getHotel(parseInt(id ?? '', 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Main>
        <Container>
          <div className="container">
            <div className="row">
              <div className="d-flex col-lg-8">
                <Breadcrumb data={breadcrumbData} />
                <PageTitle title={hotel?.nome ?? 'Carregando...'} />
              </div>
              {hotel && (
                <>
                  <Categories
                    categories={hotel.categorias}
                    url="/pontos"
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
                    network={hotel.redes}
                    openingTime={hotel.horario_funcionamento}
                  />

                  {hotel && hotel?.dicas_t && (
                    <Tips title="Dicas" content={hotel.dicas_t} />
                  )}

                  {hotel && hotel?.preco_t && (
                    <EntryValue
                      title="Valor de Entrada"
                      priceToEntry={hotel.preco_t}
                    />
                  )}

                  {Array.isArray(hotel?.viajantes) &&
                    hotel?.viajantes.length > 0 && (
                      <Informations
                        title="Tipos de Viajantes"
                        contents={hotel.viajantes}
                      />
                    )}

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
              <DownloadApp />
            </div>
          </div>
        </Container>
      </Main>
      <Footer />
    </>
  );
};

export default Hotel;
