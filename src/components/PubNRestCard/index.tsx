import { FaMotorcycle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { PubNRestType } from '../../@types/PubNRest';
import { Categories } from '../Categories';
import { Cover, PillDelivery } from './styles';

interface IPubNRestCardProps {
  pubNRest: PubNRestType;
}

const PubNRestCard: React.FC<IPubNRestCardProps> = ({ pubNRest }) => (
  <div className="card w-100 mb-3">
    <Link to={`/bares-e-restaurantes/${pubNRest.id}`}>
      <Cover style={{ backgroundImage: `url(${pubNRest.capa})` }} />
    </Link>
    <div className="card-body">
      <Link
        className="text-decoration-none text-primary"
        to={`/bares-e-restaurantes/${pubNRest.id}`}
      >
        <h5 className="card-title fs-6">{pubNRest.nome}</h5>
        {!!pubNRest.is_delivery && (
          <div className="mb-2">
            <PillDelivery className="px-3">
              <FaMotorcycle className="me-2" />
              Delivery
            </PillDelivery>
          </div>
        )}
      </Link>
      <div>
        <Categories
          categories={pubNRest.categorias}
          url="bares-e-restaurantes"
          color="light"
          size="sm"
        />
      </div>
      <div>
        {pubNRest.enderecos.map(address => (
          <p className="text-muted">{address.label}</p>
        ))}
      </div>
    </div>
  </div>
);

export default PubNRestCard;
