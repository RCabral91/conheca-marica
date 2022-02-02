import { Link } from 'react-router-dom';
import { HotelType } from '../../@types/Hotel';
import { Categories } from '../Categories';
import { AllHotelsCards, Cover } from './styles';

interface IHotelCardProps {
  hotel: HotelType;
}

const HotelCard: React.FC<IHotelCardProps> = ({ hotel }) => {
  return (
    <AllHotelsCards>
      <div className="card w-100 mb-3">
        <Link to={`/hoteis-e-pousadas/${hotel.id}`}>
          <Cover style={{ backgroundImage: `url(${hotel.capa})` }} />
        </Link>
        <div className="card-body">
          <Link to={`/hoteis-e-pousadas/${hotel.id}`}>
            <h5 className="card-title fs-6">{hotel.nome}</h5>
          </Link>
          <div>
            <Categories
              categories={hotel.categorias}
              url="hoteis-e-pousadas"
              color="light"
              size="sm"
            />
          </div>
          <div>
            {hotel.enderecos.map(address => (
              <p className="text-muted">{address.label}</p>
            ))}
          </div>
        </div>
      </div>
    </AllHotelsCards>
  );
};

export default HotelCard;
