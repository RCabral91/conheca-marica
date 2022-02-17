import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import { AllCards } from './styles';

interface ICardProps {
  icon: IconType;
  title: string;
  description: string;
  url: string;
}

export const Card: React.FC<ICardProps> = ({
  icon: Icon,
  title,
  description,
  url,
}) => {
  const isInternal = url.charAt(0) === '/';
  return (
    <AllCards>
      <div className="col">
        <div className="h-100 w-100 text-center d-flex flex-column pt-3 color-white">
          <div className="card-body d-flex flex-column">
            {isInternal ? (
              <>
                <Link to={url}>
                  <Icon size="40" className="text-dark icon mb-3" />
                </Link>
                <Link className="text-decoration-none text-dark" to={url}>
                  <h2 className="fs-sm mt-0 mb-2">{title}</h2>
                </Link>
              </>
            ) : (
              <>
                <a href={url} target="_blank" rel="noreferrer">
                  <Icon size="40" className="text-dark icon mb-3" />
                </a>
                <a
                  className="text-decoration-none text-dark"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h2 className="fs-sm mt-0 mb-2">{title}</h2>
                </a>
              </>
            )}
            <p className="text-muted fs-xs d-none d-sm-block mt-0 mb-3">
              {description}
            </p>
            <div className="mt-auto w-100">
              {isInternal ? (
                <Link to={url} className="button" title={title}>
                  Acessar
                </Link>
              ) : (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="button"
                  title={title}
                >
                  Acessar
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </AllCards>
  );
};
