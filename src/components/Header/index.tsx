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
            <Link to="/">
              <AiOutlineInfoCircle /> Sobre a Cidade
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaUmbrellaBeach /> Pontos Turísticos
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaBed /> Hotéis e Pousadas
            </Link>
          </li>
          <li>
            <Link to="/">
              <MdOutlineRestaurant /> Bares e Restaurantes
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaMotorcycle /> Delivery
            </Link>
          </li>
          <li>
            <Link to="/">
              <SiHomeassistantcommunitystore /> Comércio Local
            </Link>
          </li>
          <li>
            <Link to="/">
              <BsBookmarkStarFill /> Cupons de Desconto
            </Link>
          </li>
          <li>
            <Link to="/">
              <GiMicrophone /> Espaços para Eventos
            </Link>
          </li>
          <li>
            <Link to="/">
              <RiCalendar2Fill /> Eventos
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaRoute /> Roteiros Turísticos
            </Link>
          </li>
          <li>
            <Link to="/">
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
                <div className="d-flex justify-content-between align-items-center">
                  <button type="button" onClick={() => setShowMenu(!showMenu)}>
                    <FaBars className="fs-4 mx-3" />
                    <span className="d-none d-md-inline">Menu</span>
                  </button>
                  <img src={conhecamarica} alt="Maricá" />
                  <div className="d-none d-md-flex">
                    <FaFacebook className="fs-5 text-white" />
                    <FaInstagram className="fs-5 text-white mx-2" />
                    <FaTwitter className="fs-5 text-white" />
                    <FaYoutube className="fs-5 text-white ms-2" />
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
