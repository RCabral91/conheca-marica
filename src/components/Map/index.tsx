import { FaMapMarkedAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface IMapProps {
  url: string;
}

export const Map: React.FC<IMapProps> = ({ url }) => {
  return (
    <Link to={url} className="btn btn-primary">
      <FaMapMarkedAlt className="me-2" />
      Mapa
    </Link>
  );
};
