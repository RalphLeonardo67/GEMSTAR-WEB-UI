import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllActiveCarousels } from '../../../store/action';
import { Carousel } from 'react-bootstrap';
import img1 from '../../../assets/LandingPageImages/honda.jpg';
import img2 from '../../../assets/LandingPageImages/isuzu.jpg';
import img3 from '../../../assets/LandingPageImages/kia.jpg';
import Footer from './Footer';

const HomePage = (props) => {
  const { getAllActiveCarousels, carousels } = props;

  useEffect(() => {
    getAllActiveCarousels();
  }, []);

  if(carousels.length > 0 ) {
    return (
      <>
        <Carousel fade>
          {carousels.map(carousel => {
              return (
                <Carousel.Item key={carousel.carousel_id}>
                  <img
                    className="d-block w-100 img-fluid shadow-4"
                    src={carousel.file_destination}
                    alt={carousel.caption}
                  />
                </Carousel.Item>
              )
          })}
        </Carousel>
        <Footer />
      </>
    )
  } else {
    return (
      <>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid shadow-4"
            src={img1}
            alt="Honda"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid shadow-4"
            src={img2}
            alt="Isuzu"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid shadow-4"
            src={img3}
            alt="Kia"
          />
        </Carousel.Item>
        </Carousel>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.app.isAuthenticated,
    carousels: state.carousels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllActiveCarousels: () => dispatch(getAllActiveCarousels())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
