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
import { useCommerces } from '../../hooks/CommerceContext';
import CommerceCard from '../../components/CommerceCard';
import { setTitle } from '../../utils/title';

const CommercesByCategory: React.FC = () => {
  const {
    commerces,
    category,
    isLoading,
    getCommerces,
    getCommercesByCategory,
  } = useCommerces();
  const { id } = useParams();
  useEffect(() => {
    getCommercesByCategory(parseInt(id ?? '', 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setTitle(`${category?.label ?? 'Loading...'} | Comércio Local`);
  }, [category]);

  const handleSearch = (searchText: string): void => {
    getCommerces(searchText);
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
                    subtitle="Comércio Local"
                    url="/comercio-local"
                  />
                </div>
              </div>
              <div className="d-flex col-md-6 g-3">
                <div className="me-3">
                  <Map url="/comercio-local/mapa" />
                </div>
                <div className="flex-grow-1">
                  <SearchInput
                    onSearch={handleSearch}
                    placeholder="Buscar comércios locais"
                  />
                </div>
              </div>
            </div>
            {isLoading ? (
              <p>Carregando</p>
            ) : (
              <div className="row row-cols-3 ps-2">
                {commerces.map(commerce => {
                  return (
                    <div
                      key={commerce.id}
                      className="col align-items-stretch d-flex"
                    >
                      <CommerceCard commerce={commerce} />
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

export default CommercesByCategory;
