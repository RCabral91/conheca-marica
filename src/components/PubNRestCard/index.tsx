import { Link } from 'react-router-dom';
import { PubNRestType } from '../../@types/PubNRest';
import { Categories } from '../Categories';
import { AllPubsNRestsCards, Cover } from './styles';

interface IPubNRestCardProps {
  pubNRest: PubNRestType;
}

const PubNRestCard: React.FC<IPubNRestCardProps> = ({ pubNRest }) => {
  return (
    <AllPubsNRestsCards>
      <div className="card w-100 mb-3">
        <Link to={`/bares-e-restaurantes/${pubNRest.id}`}>
          <Cover style={{ backgroundImage: `url(${pubNRest.capa})` }} />
        </Link>
        <div className="card-body">
          <Link to={`/bares-e-restaurantes/${pubNRest.id}`}>
            <h5 className="card-title fs-6">{pubNRest.nome}</h5>
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
    </AllPubsNRestsCards>
  );
};

export default PubNRestCard;
