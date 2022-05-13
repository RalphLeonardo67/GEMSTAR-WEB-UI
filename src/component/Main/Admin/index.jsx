import React, { useState } from 'react';
import { Nav, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import MainBody from '../../UI/MainBody';
import ServicesUpdate from './Services';
import Carousel from './Carousel';

const tabsList = {
  services: { label: 'Services', link: 'services' },
  // landing_page: { label: 'Landing Page', link: 'landing_page' },
  carousel: { label: 'Carousel', link: 'carousel' }
};
const default_active_key = 'services';

const tabBody = props => {
  const { tabName } = props;
  switch (tabName) {
    case 'services':
      return <ServicesUpdate />;
    case 'carousel':
      return <Carousel />;
    default:
      return <ServicesUpdate />;
  }
};

const AdminSettings = props => {
  const [page, setPage] = useState(default_active_key);

  return (
    <MainBody>
      <Row>
        <Col>
          <Card.Title className="mt-2 ps-3 border-bottom">
            <h3>Settings</h3>
          </Card.Title>
        </Col>
      </Row>

      <Row>
        <Col>
          <Nav fill variant="tabs" defaultActiveKey={default_active_key}>
            {Object.keys(tabsList).map(tab => {
              const tabDetails = tabsList[tab];
              return (
                <Nav.Item key={`item-${tab}`}>
                  <Nav.Link
                    key={tab}
                    onClick={() => setPage(tab)}
                    eventKey={tab}>
                    <Link
                      className="text-decoration-none text-dark fw-bold"
                      to={`#${tabDetails.link}`}>
                      {tabDetails.label}
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="border border-top-0 px-3 py-4">
            {tabBody({ tabName: page, ...props })}
          </div>
        </Col>
      </Row>
    </MainBody>
  );
};

export default AdminSettings;
