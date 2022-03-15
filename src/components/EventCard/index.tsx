import { Link } from 'react-router-dom';
import { EventType } from '../../@types/Event';
import { Categories } from '../Categories';
import { Cover } from './styles';

interface IEventCardProps {
  event: EventType;
}

export const getDate = (isoDate: string): string => {
  const isInvalid = new Date(isoDate).toString() === 'Invalid Date';
  if (isInvalid) return 'Invalid Date';

  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(isoDate));
};

const EventCard: React.FC<IEventCardProps> = ({ event }) => (
  <div className="card w-100 mb-3">
    <Link to={`/eventos/${event?.id}`}>
      <Cover style={{ backgroundImage: `url(${event?.capa})` }} />
    </Link>
    <div className="card-body">
      <div className="text-uppercase text-danger">
        {getDate(event.datahora_inicio)}
      </div>
      <Link
        className="text-decoration-none text-primary"
        to={`/eventos/${event?.id}`}
      >
        <h5 className="card-title fs-6">{event?.nome}</h5>
      </Link>
      <div>
        <Categories
          categories={event?.categorias}
          url="eventos"
          color="light"
          size="sm"
        />
      </div>
      <div>
        {event?.enderecos.map(address => (
          <p className="text-muted">{address.label}</p>
        ))}
      </div>
    </div>
  </div>
);

export default EventCard;
