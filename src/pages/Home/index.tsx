import { Header } from '../../components/Header';
import { Carousel } from '../../components/Carousel';
import { Footer } from '../../components/Footer';
import { MainPage } from '../../components/MainPage';

export const Home: React.FC = () => (
  <>
    <Header />
    <Carousel />
    <MainPage />
    <Footer />
  </>
);
