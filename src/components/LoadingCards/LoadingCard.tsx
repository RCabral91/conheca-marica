import ContentLoader from 'react-content-loader';

const LoadingCard: React.FC = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={300}
    backgroundColor="#dad5d5"
    foregroundColor="#ebe6e6"
  >
    <rect x="0" y="0" rx="5" ry="5" width="100%" height="300" />
  </ContentLoader>
);

export default LoadingCard;
