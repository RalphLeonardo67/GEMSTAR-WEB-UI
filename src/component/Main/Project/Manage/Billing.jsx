import React, { useRef } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table
} from 'react-bootstrap';
import ReactToPrint from 'react-to-print';

import logo from '../../../../assets/LandingPageImages/logo.png';
import LabelAndText from '../../../UI/LabelAndText';
import { dateFormatting } from './../../../Shared/Helpers/dateFormat';

const ViewBillingInvoice = props => {
  const { handleClose, show, projectQuotation, services } = props;
  const placeHolderbaba = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
  ];
  const ref = useRef();

  return (
    <>
      <Modal show={show} size="xl" onHide={handleClose} keyboard={false}>
        <Modal.Body>
          <div ref={ref}>
            <Container>
              <div className="d-flex justify-content-start">
                <div className="ms-5">
                  <img className="h-100 w-75" src={logo} alt="logo" />
                </div>
                <div className="text-center">
                  <h5 className="mb-0 mt-2">GEMSTAR ENGINEERING SERVICES</h5>
                  <p className="mb-1">
                    MACHINE SHOP | METAL FABRICATION | ENGINE REBUILDER | AUTO
                    SHOP
                  </p>
                  <p className="mb-1">
                    C. Morales Bldg., Nat'l Hi-way, Canlalay, Biñan City, Laguna
                  </p>
                  <p className="mb-1">Contact No.: +63 927 850 3420</p>
                  <p className="mb-1">gemstar.machineshop@gmail.com</p>
                </div>
              </div>

              <hr />
              {Object.keys(projectQuotation).length > 0 ? (
                <>
                  <Row>
                    <Col>
                      <h4 className="text-center">BILLING INVOICE</h4>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={8} xs={12}>
                      <Form.Group controlId="formGridCustomer">
                        <LabelAndText
                          className="mb-2"
                          label="CUSTOMER: "
                          value={projectQuotation.customer}
                          isReadOnly={true}
                        />

                        <LabelAndText
                          className="mb-2"
                          label="ADDRESS: "
                          value={projectQuotation.address}
                          isReadOnly={true}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={4} xs={12}>
                      <Form.Group controlId="formGridCompany">
                        <LabelAndText
                          className="mb-2"
                          label="DATE: "
                          value={dateFormatting(projectQuotation.date, 'mdy')}
                          isReadOnly={true}
                        />

                        <LabelAndText
                          className="mb-2"
                          label="TERMS "
                          value=""
                          isReadOnly={true}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {services.length > 0 ? (
                        <Table bordered hover>
                          <thead>
                            <tr className="text-center">
                              <th>QTY</th>
                              <th>UNIT</th>
                              <th>DESCRIPTION</th>
                              <th>UNIT PRICE</th>
                              <th>AMOUNT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {projectQuotation.services &&
                            projectQuotation.services.length > 0
                              ? projectQuotation.services.map((res, index) => {
                                  placeHolderbaba.pop();
                                  return (
                                    <tr
                                      key={`bil-dec-${index}`}
                                      className="text-center">
                                      <td>{res.quantity}</td>
                                      <td>{res.unit}</td>
                                      <td className="text-start">
                                        {res.services_name}
                                      </td>
                                      <td>{res.unit_price}</td>
                                      <td>{res.price}</td>
                                    </tr>
                                  );
                                })
                              : ''}
                            {placeHolderbaba.map((res, index) => {
                              return (
                                <tr
                                  key={`bil-pla-${index}`}
                                  className="text-center">
                                  <td className="p-3"></td>
                                  <td className="p-3"> </td>
                                  <td className="text-start p-3"></td>
                                  <td className="p-3"></td>
                                  <td className="p-3"></td>
                                </tr>
                              );
                            })}
                            <tr className="text-center">
                              <th colSpan={4} className="text-end">
                                TOTAL AMOUNT
                              </th>
                              <td className="text-center">
                                {projectQuotation.totalAmount || 0}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      ) : (
                        'No Services'
                      )}
                    </Col>
                  </Row>
                </>
              ) : (
                ''
              )}

              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="mx-4"
                  controlId="formGridCustomer">
                  <Form.Label>Prepared by:</Form.Label>
                  <Form.Control
                    className="border-0 border-bottom"
                    type="text"
                  />
                  <p className="text-center">Gemstar Engineering Services</p>
                </Form.Group>

                <Form.Group
                  as={Col}
                  className="mx-4"
                  controlId="formGridCompany">
                  <Form.Label>Received by:</Form.Label>
                  <Form.Control
                    className="border-0 border-bottom"
                    type="text"
                  />
                  <p className="text-center">
                    Customer Signature over printed name
                  </p>
                </Form.Group>
              </Row>
            </Container>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <ReactToPrint
            trigger={() => <Button variant="primary">Print</Button>}
            content={() => ref.current}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewBillingInvoice;
