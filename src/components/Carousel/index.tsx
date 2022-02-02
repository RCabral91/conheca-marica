import { useEffect } from 'react';
import { useBanners } from '../../hooks/BannerContext';

export const Carousel: React.FC = () => {
  const { banners, isLoading, hasError, getBanners } = useBanners();

  useEffect(() => {
    getBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="mb-4 d-none d-md-block">
      <div
        id="carousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {hasError && 'Erro ao Carregar'}
          {isLoading && 'Carregando Banners'}
          {!isLoading &&
            banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
              >
                <img
                  src={banner.image_l}
                  className="d-block w-100"
                  alt="carousel"
                />
              </div>
            ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};
