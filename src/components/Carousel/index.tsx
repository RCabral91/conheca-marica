import carouselLarge from '../../assets/carouselLarge.jpeg';
import carouselLarge1 from '../../assets/carouselLarge1.jpeg';
import carouselLarge2 from '../../assets/carouselLarge2.jpeg';

export const Carousel: React.FC = () => {
  return (
    <section className="my-4 d-none d-md-block">
      <div className="container">
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={carouselLarge}
                className="d-block w-100"
                alt="carousel"
                height="400px"
              />
            </div>
            <div className="carousel-item">
              <img
                src={carouselLarge1}
                className="d-block w-100"
                alt="carousel"
                height="400px"
              />
            </div>
            <div className="carousel-item">
              <img
                src={carouselLarge2}
                className="d-block w-100"
                alt="carousel"
                height="400px"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
};
