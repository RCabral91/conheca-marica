import { useEffect } from 'react';
import { Categories } from '../../components/Categories';
import CommerceCard from '../../components/CommerceCard';
import Container from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import LoadingCards from '../../components/LoadingCards';
import LoadingGate from '../../components/LoadingGate';
import LoadingPills from '../../components/LoadingPills';
import Main from '../../components/Main';
import { Map } from '../../components/Map';
import PageTitle from '../../components/PageTitle';
import { SearchInput } from '../../components/SearchInput';
import { useCommerces } from '../../hooks/CommerceContext';

const Commerces: React.FC = () => {
  const { commerces, isLoading, categories, getCommerces } = useCommerces();

  useEffect(() => {
    getCommerces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchText: string): void => {
    getCommerces(searchText);
  };

  return (
    <>
      <Header />
      <LoadingGate
        waitFor={isLoading === false}
        meanwhile={
          <>
            <LoadingPills show numberOfCards={3} />
            <LoadingPills show numberOfCards={12} />
            <LoadingCards show numberOfCards={4} />
          </>
        }
      >
        <Main>
          <Container>
            <div className="row pt-3 pt-md-4 pb-4">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-4 mb-md-0">
                  <PageTitle title="Comércio Local" />
                </div>
              </div>
              <div className="d-flex col-md-6 g-3">
                <div className="me-3">
                  <Map />
                </div>
                <div className="input input-display">
                  <SearchInput
                    onSearch={handleSearch}
                    placeholder="Buscar comércio local"
                  />
                </div>
              </div>
            </div>
            <Categories
              categories={categories}
              url="comercio-local"
              color="secondary"
            />
            {isLoading ? (
              <p>Carregando</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 ps-2">
                {commerces.map(commerce => {
                  return (
                    <div
                      key={commerce.id}
                      className="col d-flex align-items-stretch"
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

export default Commerces;
