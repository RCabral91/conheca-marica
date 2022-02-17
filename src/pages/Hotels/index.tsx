import { useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { Categories } from '../../components/Categories';
import Container from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import HotelCard from '../../components/HotelCard';
import Main from '../../components/Main';
import { Map } from '../../components/Map';
import PageTitle from '../../components/PageTitle';
import { SearchInput } from '../../components/SearchInput';
import { useHotels } from '../../hooks/HotelsContext';

const breadcrumbData = [
  {
    title: 'Hotéis e Pousadas',
    backTo: '/',
  },
];

const Hotels: React.FC = () => {
  const { hotels, isLoading, categories, getHotels } = useHotels();

  useEffect(() => {
    getHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchText: string): void => {
    getHotels(searchText);
  };

  return (
    <>
      <Header />
      <Main>
        <Container>
          <div className="row pt-3 pt-md-4 pb-4">
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-4 mb-md-0">
                <Breadcrumb data={breadcrumbData} />
                <PageTitle title="Hotéis e Pousadas" />
              </div>
            </div>
            <div className="d-flex col-md-6">
              <div className="me-3">
                <Map />
              </div>
              <div className="input input-display">
                <SearchInput
                  onSearch={handleSearch}
                  placeholder="Buscar hotéis e pousadas"
                />
              </div>
            </div>
          </div>
          <Categories
            categories={categories}
            url="hoteis-e-pousadas"
            color="secondary"
          />
          {isLoading ? (
            <p>Carregando</p>
          ) : (
            <div className="row row-cols-3 ps-2">
              {hotels.map(hotel => {
                return (
                  <div
                    key={hotel.id}
                    className="col d-flex align-items-stretch"
                  >
                    <HotelCard hotel={hotel} />
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </Main>
      <Footer />
    </>
  );
};

export default Hotels;
