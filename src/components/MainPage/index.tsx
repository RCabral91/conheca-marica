import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaUmbrellaBeach, FaBed, FaRoute, FaMotorcycle } from 'react-icons/fa';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { MdLocalFlorist, MdOutlineRestaurant } from 'react-icons/md';
import { GiMicrophone } from 'react-icons/gi';
import { RiCalendar2Fill } from 'react-icons/ri';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { useEffect } from 'react';
import { Card } from '../Card';
import phone from '../../assets/phone.png';
import androidImg from '../../assets/androidImg.png';
import appleImg from '../../assets/appleImg.png';
import { SiteApp } from './styles';
import { setTitle } from '../../utils/title';
import { useEvents } from '../../hooks/EventsContext';

const routesUrl = process.env.REACT_APP_ROUTES_URL ?? '';
const craftUrl = process.env.REACT_APP_CRAFT_URL ?? '';

export const MainPage: React.FC = () => {
  const { getEvents } = useEvents();

  useEffect(() => {
    getEvents();
    setTitle('Conheça Maricá | Guia Turístico e Comercial de Maricá');
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container mb-4">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2 justify-content-center">
          <div className="col">
            <Card
              title="Pontos Turísticos"
              description="Conheça nossas praias, lagoas, grutas e outros pontos turísticos"
              url="/pontos-turisticos"
              icon={FaUmbrellaBeach}
            />
          </div>

          <div className="col">
            <Card
              title="Hotéis e Pousadas"
              description="Saiba onde se hospedar em Maricá"
              url="/hoteis-e-pousadas"
              icon={FaBed}
            />
          </div>
          <div className="col">
            <Card
              title="Bares e Restaurantes"
              description="Aprecie a gastronomia de Maricá"
              url="/bares-e-restaurantes"
              icon={MdOutlineRestaurant}
            />
          </div>
          <div className="col">
            <Card
              title="Delivery"
              description="Receba o melhor de Maricá no conforto da sua casa"
              url="/delivery"
              icon={FaMotorcycle}
            />
          </div>
          <div className="col">
            <Card
              title="Comércio Local"
              description="Veja onde fazer as suas compras"
              url="/comercio-local"
              icon={SiHomeassistantcommunitystore}
            />
          </div>
          <div className="col">
            <Card
              title="Cupons de Desconto"
              description="As melhores promoções para curtir a cidade"
              url="/cupons-de-desconto"
              icon={BsBookmarkStarFill}
            />
          </div>
          <div className="col">
            <Card
              title="Espaços para Eventos"
              description="Locais para fazer suas festas ou reuniões"
              url="/espacos"
              icon={GiMicrophone}
            />
          </div>
          <div className="col">
            <Card
              title="Eventos"
              description="Confira o calendário de eventos da cidade"
              url="/eventos"
              icon={RiCalendar2Fill}
            />
          </div>
          {routesUrl && (
            <div className="col">
              <Card
                title="Roteiros turísticos"
                description="Conheça diversas trilhas ecológicas e de aventura, com variados níveis de dificuldade."
                url={routesUrl}
                icon={FaRoute}
              />
            </div>
          )}
          {craftUrl && (
            <div className="col">
              <Card
                title="Artesanato"
                description="Conheça e compre as criações dos artesãos de Maricá/RJ"
                url={craftUrl}
                icon={MdLocalFlorist}
              />
            </div>
          )}
          <div className="col">
            <Card
              title="Sobre a cidade"
              description="Conheça mais sobre Maricá"
              url="/sobre"
              icon={AiOutlineInfoCircle}
            />
          </div>
        </div>
      </div>
      <SiteApp>
        <div className="positionOver">
          <div className="position d-none d-md-block" />
          <div className="container text-white py-5">
            <div className="row">
              <div className="d-flex flex-column col-md-7 mb-4 mb-md-0">
                <h2 className="font fw-bold mt-0 mb-4">
                  Conheça nosso aplicativo
                </h2>
                <p className="font-1 mt-0 mb-4">
                  Tenha o Guia Oficial de Turismo de Maricá a qualquer momento,
                  na palma das suas mãos!
                </p>
                <div className="form-row mt-auto text-center text-md-left d-flex">
                  <div className="p-1 col-6 col-md-5 mb-3">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.marica2030.app"
                      title="Google Play"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="img-fluid"
                        src={androidImg}
                        alt="Google Play"
                      />
                    </a>
                  </div>
                  <div className="p-1 col-6 col-md-5">
                    <a
                      href="https://apps.apple.com/br/app/maric%C3%A1-oficial/id1493299199"
                      title="App Store"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="img-fluid"
                        src={appleImg}
                        alt="App Store"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-5 text-center text-md-right image">
                <img
                  className="img-fluid"
                  src={phone}
                  alt="Conheça nosso app"
                />
              </div>
            </div>
          </div>
        </div>
      </SiteApp>
    </>
  );
};
