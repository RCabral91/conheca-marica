import { Link } from 'react-router-dom';
import { EventPlaceType } from '../../@types/EventPlace';
import { Categories } from '../Categories';
import { AllEventsPlacesCards, Cover } from './styles';

interface IEventPlaceCardProps {
  eventPlace: EventPlaceType;
}

const EventPlaceCard: React.FC<IEventPlaceCardProps> = ({ eventPlace }) => {
  return (
    <AllEventsPlacesCards>
      <div className="card w-100 mb-3">
        <Link to={`/espacos/${eventPlace.id}`}>
          <Cover style={{ backgroundImage: `url(${eventPlace.capa})` }} />
        </Link>
        <div className="card-body">
          <Link to={`/espacos/${eventPlace.id}`}>
            <h5 className="card-title fs-6">{eventPlace.nome}</h5>
          </Link>
          <div>
            <Categories
              categories={eventPlace.categorias}
              url="/espacos"
              color="light"
              size="sm"
            />
          </div>
          <div>
            {eventPlace.enderecos.map(address => (
              <p className="text-muted">{address.label}</p>
            ))}
          </div>
        </div>
      </div>
    </AllEventsPlacesCards>
  );
};

export default EventPlaceCard;
