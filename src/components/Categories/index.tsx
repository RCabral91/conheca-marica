import { CategoryType } from '../../@types/Category';
import { CategoryOverflow, PillStyles } from './styles';

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
  <CategoryOverflow className="mb-4">
    <ul className="d-flex flex-nowrap flex-md-wrap m-0 list-unstyled">
      {categories?.map(category => (
        <li key={category.id}>
          <PillStyles
            className={`btn btn-${color} btn-${size} me-2 mb-2`}
            title={category.label}
            to={`/${url}/categorias/${category.id}`}
          >
            {category.label}
          </PillStyles>
        </li>
      ))}
    </ul>
  </CategoryOverflow>
);
