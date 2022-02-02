import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Container from '../Container';
import { BreadcrumbStyle } from './styles';

type BreadcrumbItemType = {
  title?: string | null;
  backTo?: string;
};

interface BreadcrumbProps {
  data: BreadcrumbItemType[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ data }) => (
  <BreadcrumbStyle>
    <Container>
      <div className="d-flex mb-5">
        {data.map(breadcrumbItem => (
          <div key={breadcrumbItem.title}>
            {breadcrumbItem.backTo ? (
              <Link to={breadcrumbItem.backTo}>
                <AiOutlineArrowLeft />
              </Link>
            ) : (
              breadcrumbItem.title
            )}
          </div>
        ))}
      </div>
    </Container>
  </BreadcrumbStyle>
);

export default Breadcrumb;
