import { Link } from 'react-router-dom';
import { SpotType } from '../../@types/Spot';
import { Categories } from '../Categories';
import { Cover, SpotsCard } from './styles';

interface ISpotCardProps {
  spot: SpotType;
}

const SpotCard: React.FC<ISpotCardProps> = ({ spot }) => (
  <SpotsCard>
    <div className="card w-100 mb-3">
      <Link to={`/pontos-turisticos/${spot.id}`}>
        <Cover style={{ backgroundImage: `url(${spot.capa})` }} />
      </Link>
      <div className="card-body">
        <Link to={`/pontos-turisticos/${spot.id}`}>
          <h5 className="card-title fs-6">{spot.nome}</h5>
        </Link>
        <div>
          <Categories
            categories={spot.categorias}
            url="pontos-turisticos"
            color="light"
            size="sm"
          />
        </div>
        <div>
          {spot.enderecos.map(address => (
            <p className="text-muted">{address.label}</p>
          ))}
        </div>
      </div>
    </div>
  </SpotsCard>
);

export default SpotCard;
