import { Link } from 'react-router-dom';
import { CommerceType } from '../../@types/Commerce';
import { Categories } from '../Categories';
import { AllCommercesCards, Cover } from './styles';

interface ICommerceCardProps {
  commerce: CommerceType;
}

const CommerceCard: React.FC<ICommerceCardProps> = ({ commerce }) => {
  return (
    <AllCommercesCards>
      <div className="card w-100 mb-3">
        <Link to={`/comercio-local/${commerce.id}`}>
          <Cover style={{ backgroundImage: `url(${commerce.capa})` }} />
        </Link>
        <div className="card-body">
          <Link to={`/comercio-local/${commerce.id}`}>
            <h5 className="card-title fs-6">{commerce.nome}</h5>
          </Link>
          <div>
            <Categories
              categories={commerce.categorias}
              url="comercio-local"
              color="light"
              size="sm"
            />
          </div>
          <div>
            {commerce.enderecos.map(address => (
              <p className="text-muted">{address.label}</p>
            ))}
          </div>
        </div>
      </div>
    </AllCommercesCards>
  );
};

export default CommerceCard;
