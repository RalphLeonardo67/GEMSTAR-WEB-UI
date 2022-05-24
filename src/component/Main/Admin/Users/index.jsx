import React, { useEffect, useState } from 'react';
import {
  ListGroup,
  Table,
  Card,
  Row,
  Button, Modal, Form,
  Col,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import MainBody from '../../../UI/MainBody';
import { dateToEpoch } from '../../../Shared/Helpers/dateFormat';
import { getAllUserList, getAllUserLevel } from '../../../../store/action';
import { dateFormatting } from '../../../Shared/Helpers/dateFormat';
import { registerUser } from '../../../../store/action/index';

const UserList = props => {
  const { getAllUserList, usersList, userLevels, registerUser, getAllUserLevel } = props;
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    birthDay: '',
    contact_number: '',
    email: '',
    address: '',
    userName: '',
    user_level_id: 1,
    password: 'default!1',
    retypePassword: 'default!1'
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    registerUser({ ...values, birthDay: dateToEpoch(values.birthDay) }).then(
      res => {
        if (res.success) {
          toast.success('Registration Successful!', {
            position: toast.POSITION.TOP_CENTER
          });
          getAllUserList();
          setValues({
            firstName: '',
            middleName: '',
            lastName: '',
            birthDay: '',
            contact_number: '',
            email: '',
            address: '',
            user_level_id: 1,
            password: 'default!1',
            retypePassword: 'default!1',
            userName: ''
          });

          setShow(false);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_CENTER
          });
        }
      }
    );
  };

  useEffect(() => {
    getAllUserList();
  }, []);

  useEffect(() => {
    getAllUserLevel();
  }, []);

  return (
    <MainBody>
       <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Registration</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-2" controlId="formBasicFirstName">
              <Form.Label className="mb-0">First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicMiddleName">
              <Form.Label className="mb-0">Middle Name:</Form.Label>
              <Form.Control
                type="text"
                name="middleName"
                value={values.middleName}
                onChange={handleChange}
                placeholder="Enter your middle name"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicLastName">
              <Form.Label className="mb-0">Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicAddress">
              <Form.Label className="mb-0">Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
                placeholder="Enter Address"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formMobileNumber">
              <Form.Label className="mb-0">Mobile number:</Form.Label>
                  <Form.Control
                    type="number"
                    name="contact_number"
                    value={values.contact_number}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                  />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicBirthDate">
              <Form.Label className="mb-0">Birthday:</Form.Label>
              <Form.Control
                type="date"
                name="birthDay"
                value={values.birthDay}
                onChange={handleChange}
                placeholder="Enter your birthday"
                required
              />
            </Form.Group>

            <hr />
            <p>Account Information:</p>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label className="mb-0">Email Address:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicFirstName">
              <Form.Label className="mb-0">Username:</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={values.userName}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicSelectAccountType">
            <Form.Label className="mb-0">Account Type:</Form.Label>
            <Form.Select onChange={handleChange}  name="user_level_id">
              {userLevels.map(res => (
                <option
                  key={res.user_level_id}
                  value={res.user_level_id}
                  >
                  {res.user_level_name}
                </option>
              ))}
            </Form.Select>
            </Form.Group>
            {/* <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label className="mb-0">Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label className="mb-0">Re-Type Password:</Form.Label>
              <Form.Control
                type="password"
                name="retypePassword"
                value={values.retypePassword}
                onChange={handleChange}
                placeholder="Re-type Password"
                required
              />
            </Form.Group> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

    
      <Row>
        <Col>
          <Card.Title className="ms-2">Users</Card.Title>
          <div class="d-flex justify-content-end mb-3">
            <Button variant="primary" onClick={() => setShow(true)}>
              Add User
            </Button>
          </div>
          <hr className="mt-0" />
        </Col>
      </Row>

      <Row>
        <Col>
          {usersList.length > 0 ? (
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">email</th>
                  <th className="text-center">Birthday</th>
                  <th className="text-center">Address</th>
                  <th className="text-center">Function</th>
                  <th className="text-center">Confirmed</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {usersList.map(res => {
                  return (
                    <tr key={res.users_id}>
                      <td>{`${res.last_name}, ${res.first_name} ${res.middle_name}`}</td>
                      <td>{res.email}</td>
                      <td>{dateFormatting(res.birthday)}</td>
                      <td>{res.address}</td>
                      <td className="text-center">{res.user_level_name}</td>
                      <td
                        className={`text-center ${
                          res.is_confirmed === 1 ? 'text-success' : 'text-error'
                        }`}>
                        {res.is_confirmed === 1 ? 'true' : 'false'}
                      </td>
                      <td className="text-center">
                        <OverlayTrigger
                          trigger="click"
                          placement="left"
                          overlay={
                            <Popover id="popover-basic">
                              <Popover.Body className="p-1">
                                <ListGroup variant="flush">
                                  <ListGroup.Item className="px-2 d-flex">
                                    <Link
                                      className="flex-grow-1 ms-1 text-decoration-none text-dark"
                                      to={`/users/manage/${res.users_id}`}>
                                      Edit
                                    </Link>
                                  </ListGroup.Item>
                                </ListGroup>
                              </Popover.Body>
                            </Popover>
                          }>
                          <i className="fas fa-ellipsis-v" />
                        </OverlayTrigger>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <h5 className="text-center">No Data</h5>
          )}
        </Col>
      </Row>
    </MainBody>
  );
};

const mapStateToProps = state => {
  return {
    usersList: state.usersList,
    userLevels: state.userLevels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUserList: () => dispatch(getAllUserList()),
    getAllUserLevel: () => dispatch(getAllUserLevel()),
    registerUser: props => dispatch(registerUser(props))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
