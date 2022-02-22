import Slider from 'react-slick';
import { ImageType } from '../../@types/Image';
import { Cover } from './styles';

interface IHotelSliderProps {
  images?: ImageType[];
}

const responsive = [
  {
    breakpoint: 1400,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      dots: true,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 1,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

const HotelSlider: React.FC<IHotelSliderProps> = ({ images }) => (
  <div>
    {Array.isArray(images) && images?.length >= 4 && (
      <Slider
        className="mb-3"
        dots
        infinite
        speed={500}
        autoplay
        autoplaySpeed={3000}
        slidesToShow={4}
        slidesToScroll={1}
        initialSlide={0}
        responsive={responsive}
        pauseOnHover
      >
        {images?.map(image => (
          <div key={image.id}>
            <Cover style={{ backgroundImage: `url(${image.src})` }} />
          </div>
        ))}
      </Slider>
    )}
    {Array.isArray(images) && images?.length <= 3 && (
      <div className="d-flex">
        {images?.map(image => (
          <div className="flex-grow-1 align-self-stretch" key={image.id}>
            <Cover style={{ backgroundImage: `url(${image.src})` }} />
          </div>
        ))}
      </div>
    )}
  </div>
);

export default HotelSlider;
