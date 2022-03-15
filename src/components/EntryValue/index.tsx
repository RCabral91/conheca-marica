/* eslint-disable camelcase */
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { Icon } from './styles';

interface IInformationsProps {
  title: string;
  priceToEntry: string;
  isFree: boolean;
}

const EntryValue: React.FC<IInformationsProps> = ({
  title,
  priceToEntry,
  isFree,
}) => (
  <div className="mt-5">
    <h2 className="fs-4 pb-2 border-2 border-bottom mb-4">{title}</h2>
    <div className="fs-5 d-flex align-items-center">
      <Icon className="pe-3">
        <FaRegMoneyBillAlt />
      </Icon>
      <span>{isFree ? 'Gratuito' : priceToEntry}</span>
    </div>
  </div>
);

export default EntryValue;
