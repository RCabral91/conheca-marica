import { Link } from 'react-router-dom';
import { CategoryType } from '../../@types/Category';

interface ICategoriesProps {
  categories?: CategoryType[];
  url: string;
  color?: 'primary' | 'secondary' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const Categories: React.FC<ICategoriesProps> = ({
  categories,
  url,
  color = 'primary',
  size = 'md',
}) => (
  <div className="mb-4">
    <ul className="d-flex flex-nowrap flex-md-wrap m-0 list-unstyled">
      {categories?.map(category => (
        <li key={category.id}>
          <Link
            className={`btn btn-${color} btn-${size} me-2 mb-2`}
            title={category.label}
            to={`/${url}/categorias/${category.id}`}
          >
            {category.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
