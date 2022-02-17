/* eslint-disable camelcase */
import { AiOutlineMail } from 'react-icons/ai';
import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa';
import { FiMapPin, FiPhone } from 'react-icons/fi';
import { MdOutlineWatchLater } from 'react-icons/md';
import { AddressType } from '../../@types/Address';
import { NetworkType } from '../../@types/Network';
import { OpeningTimeType } from '../../@types/OpeningTime';
import { PhoneType } from '../../@types/Phone';
import { IconStyle } from './styles';

interface IAboutProps {
  title: string;
  addresses: AddressType[];
  phones: PhoneType[];
  email?: string;
  network: NetworkType[];
  openingTime: OpeningTimeType[];
}

const icons = {
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  Twitter: FaTwitter,
  Youtube: FaYoutube,
  LinkedIn: FaLinkedinIn,
};

const About: React.FC<IAboutProps> = ({
  title,
  addresses,
  phones,
  email,
  network,
  openingTime,
}) => (
  <div className="mt-5">
    <h2 className=" fs-4 border-2 border-bottom">{title}</h2>
    <ul className="fs-5 align-items-center p-0">
      {addresses.map(info => (
        <li className="d-flex align-items-center list-unstyled col pb-4">
          <div className="px-2">
            <IconStyle>
              <FiMapPin />
            </IconStyle>
          </div>
          <div className="px-2 m-0">{info.label}</div>
        </li>
      ))}
      {phones.map(info => (
        <li className="d-flex align-items-center list-unstyled col pb-4">
          {info.whatsapp ? (
            <IconStyle className="px-2">
              <FaWhatsapp />
            </IconStyle>
          ) : (
            <IconStyle className="px-2">
              <FiPhone />
            </IconStyle>
          )}
          <div className="px-2 m-0">{info.nome}</div>
          <div className="px-2 m-0">{info.number}</div>
        </li>
      ))}
      {email && (
        <li className="d-flex align-items-center list-unstyled col pb-4">
          <div className="px-2">
            <IconStyle>
              <AiOutlineMail />
            </IconStyle>
          </div>
          <div className="px-2 m-0">{email}</div>
        </li>
      )}
      {network && (
        <li className="d-flex align-items-center list-unstyled pb-4">
          {network.map(info => {
            const Icon = icons[info.nome];
            return (
              <>
                <IconStyle key="info.id" className="px-2">
                  <Icon />
                </IconStyle>
                <a
                  href={info.url}
                  target="_blank"
                  className="px-2 m-0 text-decoration-none"
                  rel="noreferrer"
                >
                  {info.user}
                </a>
              </>
            );
          })}
        </li>
      )}
      {openingTime.map(info => (
        <li className="d-flex align-items-center list-unstyled col pb-4">
          <div className="px-2">
            <IconStyle>
              <MdOutlineWatchLater />
            </IconStyle>
          </div>
          <div className="px-2 m-0">{info.label}</div>
          <div className="flex-column">
            {info.horario.abre} às {info.horario.fecha}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default About;
