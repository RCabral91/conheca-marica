import { Link } from 'react-router-dom';
import { EventSpaceType } from '../../@types/EventSpace';
import { Categories } from '../Categories';
import { Cover } from './styles';

interface IEventSpaceCardProps {
  eventSpace: EventSpaceType;
}

const EventSpaceCard: React.FC<IEventSpaceCardProps> = ({ eventSpace }) => (
  <div className="card w-100 mb-3">
    <Link to={`/espacos/${eventSpace.id}`}>
      <Cover style={{ backgroundImage: `url(${eventSpace.capa})` }} />
    </Link>
    <div className="card-body">
      <Link
        className="text-decoration-none text-primary"
        to={`/espacos/${eventSpace.id}`}
      >
        <h5 className="card-title fs-6">{eventSpace.nome}</h5>
      </Link>
      <div>
        <Categories
          categories={eventSpace.categorias}
          url="espacos"
          color="light"
          size="sm"
        />
      </div>
      <div>
        {eventSpace.enderecos.map(address => (
          <p className="text-muted">{address.label}</p>
        ))}
      </div>
    </div>
  </div>
);

export default EventSpaceCard;
