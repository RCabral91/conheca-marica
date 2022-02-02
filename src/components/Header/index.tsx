import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlineInfoCircle } from 'react-icons/ai';
import {
  FaBars,
  FaUmbrellaBeach,
  FaBed,
  FaRoute,
  FaMotorcycle,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from 'react-icons/fa';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { MdLocalFlorist, MdOutlineRestaurant } from 'react-icons/md';
import { GiMicrophone } from 'react-icons/gi';
import { RiCalendar2Fill } from 'react-icons/ri';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import conhecamarica from '../../assets/conhecamarica.png';
import { Container, Content, Menu } from './styles';

export const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Menu className={showMenu ? 'show' : ''}>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={() => setShowMenu(false)}
        />
        <ul className="mt-5">
          <li>
            <Link to="/">
              <AiFillHome /> Inicial
            </Link>
          </li>
          <li>
            <Link to="/sobre-a-cidade">
              <AiOutlineInfoCircle /> Sobre a Cidade
            </Link>
          </li>
          <li>
            <Link to="/pontos-turisticos">
              <FaUmbrellaBeach /> Pontos Turísticos
            </Link>
          </li>
          <li>
            <Link to="/hoteis-e-pousadas">
              <FaBed /> Hotéis e Pousadas
            </Link>
          </li>
          <li>
            <Link to="/bares-e-restaurantes">
              <MdOutlineRestaurant /> Bares e Restaurantes
            </Link>
          </li>
          <li>
            <Link to="/delivery">
              <FaMotorcycle /> Delivery
            </Link>
          </li>
          <li>
            <Link to="/comercio-local">
              <SiHomeassistantcommunitystore /> Comércio Local
            </Link>
          </li>
          <li>
            <Link to="/cupons-de-desconto">
              <BsBookmarkStarFill /> Cupons de Desconto
            </Link>
          </li>
          <li>
            <Link to="/espacos-para-eventos">
              <GiMicrophone /> Espaços para Eventos
            </Link>
          </li>
          <li>
            <Link to="/eventos">
              <RiCalendar2Fill /> Eventos
            </Link>
          </li>
          <li>
            <Link to="/roteiros-turisticos">
              <FaRoute /> Roteiros Turísticos
            </Link>
          </li>
          <li>
            <Link to="/artesanato">
              <MdLocalFlorist /> Artesanato
            </Link>
          </li>
        </ul>
      </Menu>

      <Container>
        <Content>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="d-flex text-white justify-content-between align-items-center">
                  <button type="button" onClick={() => setShowMenu(!showMenu)}>
                    <FaBars className="fs-4 m-3" />
                    <span className="d-none d-md-inline">Menu</span>
                  </button>
                  <img src={conhecamarica} alt="Maricá" />
                  <div className="d-none d-md-flex">
                    <a
                      href="https://www.facebook.com/prefeiturademarica?_rdc=1&_rdr"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaFacebook className="fs-5 text-white" />
                    </a>
                    <a
                      href="https://www.instagram.com/prefeiturademarica/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaInstagram className="fs-5 text-white mx-2" />
                    </a>
                    <a
                      href="https://twitter.com/MaricaRJ"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaTwitter className="fs-5 text-white" />
                    </a>
                    <a
                      href="https://www.youtube.com/user/prefeiturademarica1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaYoutube className="fs-5 text-white ms-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
};
