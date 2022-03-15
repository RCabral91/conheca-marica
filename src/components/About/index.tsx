/* eslint-disable camelcase */
import { Fragment } from 'react';
import { AiOutlineGlobal, AiOutlineMail } from 'react-icons/ai';
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
import { IconStyle, WrapTip } from './styles';

interface IAboutProps {
  title: string;
  addresses?: AddressType[];
  phones?: PhoneType[];
  email?: string;
  network?: NetworkType[];
  openingTime?: OpeningTimeType[];
  site?: string;
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
  site,
}) => (
  <WrapTip>
    <div className="mt-5">
      <h2 className=" fs-4 border-2 border-bottom">{title}</h2>
      <ul className="fs-5 align-items-center p-0">
        {addresses?.map(info => (
          <li
            key="info.id"
            className="d-flex align-items-center list-unstyled col pb-4"
          >
            <div className="px-2">
              <IconStyle>
                <FiMapPin />
              </IconStyle>
            </div>
            <div className="px-2 m-0">{info.label}</div>
          </li>
        ))}
        {Array.isArray(phones) &&
          phones.length > 0 &&
          phones.map(info => (
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
              <div className="flex-column">
                <div className="px-2 m-0">{info.nome}</div>
                <div className="px-2 m-0">{info.number}</div>
              </div>
            </li>
          ))}
        {email && (
          <li className="d-flex align-items-center list-unstyled col pb-2">
            <div className="px-2">
              <IconStyle>
                <AiOutlineMail />
              </IconStyle>
            </div>
            <div className="px-2 m-0">{email}</div>
          </li>
        )}
        {network && (
          <li className="align-items-center list-unstyled pb-2">
            {network.map(info => {
              const Icon = icons[info.nome];
              return (
                <Fragment key="info.id">
                  <div className="d-flex my-3">
                    <IconStyle className="px-2">
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
                  </div>
                </Fragment>
              );
            })}
          </li>
        )}

        {Array.isArray(openingTime) && openingTime.length > 0 && (
          <li className="d-flex list-unstyled pb-4">
            <div className="px-2">
              <IconStyle>
                <MdOutlineWatchLater />
              </IconStyle>
            </div>
            <div>
              {openingTime?.map(info => (
                <Fragment key={info.label}>
                  <div className="m-0 fw-bold">{info.label}</div>
                  <div>
                    {info.horario.abre} às {info.horario.fecha}
                  </div>
                </Fragment>
              ))}
            </div>
          </li>
        )}
        {site && (
          <li className="d-flex align-items-center list-unstyled col pb-4">
            <div className="px-2">
              <IconStyle>
                <AiOutlineGlobal />
              </IconStyle>
            </div>
            <div className="px-2 m-0">{site}</div>
          </li>
        )}
      </ul>
    </div>
  </WrapTip>
);

export default About;
