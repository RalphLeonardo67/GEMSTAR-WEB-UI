import { Carousel } from 'react-bootstrap';
import img1 from '../../../assets/LandingPageImages/honda.jpg';
import img2 from '../../../assets/LandingPageImages/isuzu.jpg';
import img3 from '../../../assets/LandingPageImages/kia.jpg';
import Footer from './Footer';

const HomePage = () => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img1}
            alt="Honda"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Isuzu"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3}
            alt="Kia"
          />
        </Carousel.Item>
      </Carousel>
      <Footer />
    </>
  );
};

export default HomePage;
