import { FaYoutube, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import maricafooter from '../../assets/maricafooter.png';
import maricafooter2 from '../../assets/maricafooter2.png';
import { FooterStyles } from './styles';

export const Footer: React.FC = () => {
  return (
    <FooterStyles>
      <div className="container text-white py-5 py-md-3">
        <div className="row">
          <div className="d-flex flex-column col-xl-6 mb-4 mb-xl-0">
            <div className="d-flex align-items-center justify-content-center justify-content-xl-start mb-2">
              <a
                href="https://www.facebook.com/prefeiturademarica?_rdc=1&_rdr"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook className="me-3" />
                <span className="d-none d-md-inline">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/prefeiturademarica/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram className="mx-3" />
                <span className="d-none d-md-inline">Instagram</span>
              </a>
              <a
                href="https://twitter.com/MaricaRJ"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter className="mx-3" />
                <span className="d-none d-md-inline">Twitter</span>
              </a>
              <a
                href="https://www.youtube.com/user/prefeiturademarica1"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube className="mx-3" />
                <span className="d-none d-md-inline">Youtube</span>
              </a>
            </div>
            <div className="text-center text-xl-start">
              <a
                href="https://app.marica2030.com.br/login"
                target="_blank"
                rel="noreferrer"
              >
                Área do comerciante
              </a>
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row col-xl-6 justify-content-center justify-content-xl-end text-center text-md-left">
            <div className="mb-3 mb-md-0">
              <img src={maricafooter2} alt="marica" height="60px" />
            </div>
            <div className="mx-md-4 mb-3 mb-md-0">
              <p className="mb-1">
                <a
                  href="https://www.conhecamarica.com.br/static/media/guia-gastronomico.f9556598.pdf"
                  target="_blank"
                  title="Guia Gastronomico"
                  rel="noreferrer"
                >
                  Manual Gastronomia
                </a>
              </p>
              <p className="mb-1">
                <a
                  href="https://www.conhecamarica.com.br/static/media/guia-hospedagem.2046547a.pdf"
                  target="_blank"
                  title="Guia Hospedagem"
                  rel="noreferrer"
                >
                  Manual Hospedagem
                </a>
              </p>
            </div>
            <div>
              <img src={maricafooter} alt="Maricá Turismo" />
            </div>
          </div>
        </div>
      </div>
    </FooterStyles>
  );
};
