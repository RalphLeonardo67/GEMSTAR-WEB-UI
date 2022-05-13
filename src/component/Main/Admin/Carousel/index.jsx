import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import { addServices, fetchServices } from '../../../../store/action';

const Carousel = props => {
  const { addServices, fetchServices, services } = props;

  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    service_type: '',
    price: 0
  });

  const [file, setFile] = useState({
    service_type: '',
    price: 0
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleFileUpload = e => {
    const files = e.target.files[0];
    setFile(files);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addServices({ ...values, file }).then(ret => {
      setShow(false);
    });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Modal.Header closeButton>
            <Modal.Title>Add Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Control
                type="file"
                name="file"
                // value={values.file}
                onChange={handleFileUpload}
                multiple
              />
            </Form.Group>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Upload
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <div class="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={() => setShow(true)}>
          Add Photo
        </Button>
      </div>

      {/* <Table striped bordered responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Service Name</th>
            <th>Price</th>
            <th>Added By</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(services).length > 0 ? services.map(ret => {
            return (
              <tr>
                <th>{ret.services_id}</th>
                <td>{ret.services_name}</td>
                <td>{ret.services_price}</td>
                <td>{`${ret.last_name}, ${ret.first_name}`}</td>
              </tr>
            )
          }):""}
        </tbody>
      </Table> */}
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.app.isAuthenticated,
    services: state.services
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addServices: props => dispatch(addServices(props)),
    fetchServices: () => dispatch(fetchServices())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
