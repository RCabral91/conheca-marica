import LoadingCard from './LoadingCard';

interface ILoadingCardsProps {
  show: boolean;
  amount?: number;
}

const LoadingCards: React.FC<ILoadingCardsProps> = ({ show, amount = 12 }) =>
  show ? (
    <div className="row row-cols-4 g-3">
      {[...Array(amount)].map(() => (
        <div className="col">
          <LoadingCard />
        </div>
      ))}
    </div>
  ) : null;

export default LoadingCards;
