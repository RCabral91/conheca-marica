import { FaMotorcycle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AddressType } from '../../@types/Address';
import { CategoryType } from '../../@types/Category';
import { BorderCard, Cover, Section } from './styles';

interface ICardProps {
  url: string;
  path: string;
  nome: string;
  addresses: AddressType[];
  image: string;
  categories: CategoryType[];
  isDelivery?: number;
  fullDate?: string;
  setCategory: (category: CategoryType) => void;
}

const BigCard: React.FC<ICardProps> = ({
  url,
  path,
  nome,
  addresses,
  image,
  categories,
  isDelivery,
  fullDate,
  setCategory,
}) => {
  const date = fullDate ? new Date(fullDate) : null;
  const onlyMonth = date?.toLocaleString('pt-BR', { month: 'short' });
  const onlyDay = date?.toLocaleString('pt-BR', { day: '2-digit' });

  return (
    <Section className="d-flex col">
      <BorderCard className="card align-self-stretch w-100 text-start border-0 shadow-sm">
        <Link to={url} className="fs-1 text-center">
          <Cover style={{ backgroundImage: `url(${image})` }} />
        </Link>
        {/* <div className="card-body">
          {fullDate ? (
            <div className="d-flex">
              <div>
                <h3 className="card-title fs-5 mb-2 text-danger text-center">
                  {capitalize(`${onlyMonth}`)}
                </h3>
                <h3 className="card-title fs-5 mb-2 text-center">{onlyDay}</h3>
              </div>
              <div className="ms-3">
                <Link to={url} className="text-decoration-none">
                  <h5 className="card-title fs-5 mb-2">{nome}</h5>
                </Link>
                {isDelivery ? (
                  <div className="mb-2">
                    <Pill url="" color="primary">
                      <FaMotorcycle className="fs-5 pb-1" /> Delivery
                    </Pill>
                  </div>
                ) : null}
                <Pills
                  setCategory={setCategory}
                  categories={categories}
                  url={`/${path}/categorias`}
                />
              </div>
            </div>
          ) : (
            <>
              <Link to={url} className="text-decoration-none">
                <h5 className="card-title fs-5 mb-2">{nome}</h5>
              </Link>
              {isDelivery ? (
                <div className="mb-2">
                  <Pill url="" color="primary">
                    <FaMotorcycle className="fs-5 pb-1" /> Delivery
                  </Pill>
                </div>
              ) : null}
              <Pills
                setCategory={setCategory}
                categories={categories}
                url={`/${path}/categorias`}
              />
            </>
          )}
          {addresses.map(address => (
            <p className="card-text mt-2 pb-4" key={address.id}>
              {address.label}
            </p>
          ))}
        </div> */}
      </BorderCard>
    </Section>
  );
};
