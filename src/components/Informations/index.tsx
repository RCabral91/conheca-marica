import { AiOutlineCheckCircle } from 'react-icons/ai';
import { SVGIcon } from './styles';
import { GeneralInfoType } from '../../@types/GeneralInfo';

interface IInformationsProps {
  title: string;
  contents?: GeneralInfoType[];
}

const Informations: React.FC<IInformationsProps> = ({ title, contents }) => (
  <div className="mt-5">
    <h2 className="fs-4 pb-2 border-2 border-bottom mb-4">{title}</h2>
    <div className="fs-5 align-items-center p-0 row row-cols-3 pe-3">
      {contents?.map(info => (
        <div className="col-sm-12 col-md-4">
          <div className="d-flex align-items-center list-unstyled pb-4">
            <div className="px-2">
              {info.icone ? (
                <SVGIcon src={info.icone} />
              ) : (
                <AiOutlineCheckCircle color="#6ebd00" />
              )}
            </div>
            <div className="px-2 m-0">{info.label}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Informations;
