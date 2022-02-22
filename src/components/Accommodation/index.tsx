/* eslint-disable camelcase */
import { TiCoffee } from 'react-icons/ti';
import { IoMdKey } from 'react-icons/io';
import { FaBed, FaConciergeBell } from 'react-icons/fa';
import { GiKnifeFork } from 'react-icons/gi';
import { IconStyle } from './styles';

interface IAccommodationProps {
  title: string;
  quartos?: number;
  leitos?: number;
  cafe_manha?: boolean;
  cafe_hospedes?: boolean;
  almoco?: boolean;
  almoco_hospedes?: boolean;
  jantar?: boolean;
  jantar_hospedes?: boolean;
}

const About: React.FC<IAccommodationProps> = ({
  title,
  quartos,
  cafe_manha,
  cafe_hospedes,
  leitos,
  almoco,
  almoco_hospedes,
  jantar,
  jantar_hospedes,
}) => (
  <div className="mt-5">
    <h2 className=" fs-4 border-2 border-bottom">{title}</h2>
    <ul className="fs-5 align-items-center p-0">
      {quartos && (
        <li className="d-flex align-items-center list-unstyled col pb-4">
          <div className="px-2">
            <IconStyle>
              <IoMdKey />
            </IconStyle>
          </div>
          <div className="px-2 m-0">{quartos} quartos</div>
        </li>
      )}
      {cafe_manha && (
        <li className="d-flex align-items-center list-unstyled col pb-4">
          <div className="px-2">
            <IconStyle>
              <TiCoffee />
            </IconStyle>
          </div>
          <div>
            <p>Aceita café da manhã</p>
            {cafe_hospedes ? 'Aceita não-hóspedes' : 'Apenas para hóspedes'}
          </div>
        </li>
      )}

      {leitos && (
        <li className="d-flex align-items-center list-unstyled col pb-4">
          <div className="px-2">
            <IconStyle>
              <FaBed />
            </IconStyle>
          </div>
          <div className="px-2 m-0">{leitos} leitos</div>
        </li>
      )}
      {almoco && (
        <li className="d-flex align-items-center list-unstyled col pb-4">
          <div className="px-2">
            <IconStyle>
              <GiKnifeFork />
            </IconStyle>
          </div>
          <div className="px-2 m-0">{almoco}</div>
        </li>
      )}
      {almoco_hospedes && (
        <li className="d-flex align-items-center list-unstyled col pb-4">
          <div className="px-2">
            <IconStyle>
              <GiKnifeFork />
            </IconStyle>
          </div>
          <div className="px-2 m-0">{almoco_hospedes}</div>
        </li>
      )}
      {jantar && (
        <li className="d-flex align-items-center list-unstyled col pb-4">
          <div className="px-2">
            <IconStyle>
              <FaConciergeBell />
            </IconStyle>
          </div>
          <div className="px-2 m-0">{jantar}</div>
        </li>
      )}
      {jantar_hospedes && (
        <li className="d-flex align-items-center list-unstyled col pb-4">
          <div className="px-2">
            <IconStyle>
              <FaConciergeBell />
            </IconStyle>
          </div>
          <div className="px-2 m-0">{jantar_hospedes}</div>
        </li>
      )}
    </ul>
  </div>
);

export default About;
