import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { SpotType } from '../../@types/Spot';
import Breadcrumb from '../../components/Breadcrumb';
import { Categories } from '../../components/Categories';
import Container from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import Main from '../../components/Main';
import PageTitle from '../../components/PageTitle';
import { useSpots } from '../../hooks/SpotsContext';
// import { SearchInput } from '../../components/SearchInput';
// import Main from '../../components/Main';

const TouristHotspot: React.FC = () => {
  const { isLoading, spot } = useSpots();
  const { id } = useParams();
  useEffect(() => {
    getSpots(parseInt(id ?? '', 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const breadcrumbData = [
    {
      title: 'Pontos Turísticos',
      backTo: '/',
    },
  ];

  return (
    <>
      <Header />
      <Main>
        <Container>
          <div className="row pt-3 pt-md-4 pb-4">
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-4 mb-md-0">
                <Breadcrumb data={breadcrumbData} />
                <PageTitle title="Pontos Turísticos" />
              </div>
            </div>
            <div className="d-flex col-md-6 g-3" />
          </div>
          <Categories
            categories={spot}
            url="pontos-turisticos"
            color="secondary"
          />
          {/* <div className="row row-cols-3 ps-2">
            {spot.map(spot => {
              return (
              <div key={spot.id} className="col align-items-stretch d-flex">
       mudar para outro ocmponete  =>   <SpotCard spot={spot} />
                 </div>
              );
            })}
          </div> */}
        </Container>
      </Main>
      <Footer />
    </>
  );
};

export default TouristHotspot;
