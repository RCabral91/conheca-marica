import { FaMapMarkedAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Map: React.FC = () => {
  return (
    <Link to="/pontos">
      <button type="button" className="btn btn-primary">
        <FaMapMarkedAlt className="me-2" />
        Mapa
      </button>
    </Link>
  );
};
