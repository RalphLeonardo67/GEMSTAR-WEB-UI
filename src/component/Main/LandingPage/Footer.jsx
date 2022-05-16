/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';

const FooterPage = () => {
  return (
    <div className="bg-landing_footer">
      <Container>
        <Row className="py-5 text-center">
          <Col sm={12} md={4}>
            <h5 className="text-uppercase text-white mb-4 font-weight-bold">Link</h5>
            <ul className="list-unstyled">
              <p>
                <Link
                  className="text-white text-decoration-none"
                  to={`/create`}>
                  Create Project
                </Link>
              </p>
            </ul>
          </Col>
          <Col>
            <h5 className="text-uppercase text-white mb-4 font-weight-bold">Address</h5>
            <p className="text-white">
              <i className="fa fa-home mr-3" /> National Highway Canlalay, Biñan
              City, Laguna
            </p>
            <p className="text-white">
              <i className="fa fa-envelope mr-3" />{' '}
              gemstar.machineshop@gmail.com
            </p>
            <p className="text-white">
              <i className="fa fa-phone mr-3" /> + 63 927 850 3420
            </p>
          </Col>
          <Col>
            <h5 className="text-uppercase text-white mb-4 font-weight-bold">follow us</h5>
            <div className="mt-2 ">
              <a
                type="button"
                className="text-uppercase text-white py-0 px-2 border rounded-circle"
                href="https://www.facebook.com/Gemstar-Engineering-Services-577207799448497"
                >
                <i className="fab fa-facebook-f" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    
  );
};

export default FooterPage;
