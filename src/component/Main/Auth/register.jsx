import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { registerUser } from '../../../store/action/index';
import { dateToEpoch } from '../../Shared/Helpers/dateFormat';
import MaxWidthBody from '../../UI/MaxWidthBody';

const RegistrationForm = props => {
  const { registerUser } = props;

  const [values, setValues] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    birthDay: '',
    email: '',
    contact_number: '',
    address: '',
    userName: '',
    user_level_id: 1,
    password: '',
    retypePassword: ''
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
    if (values.password === values.retypePassword) {
      registerUser({ ...values, birthDay: dateToEpoch(values.birthDay) }).then(
        ret => {
          if (ret.success) {
            toast.success('Registration Successful!', {
              position: toast.POSITION.TOP_CENTER
            });
            props.history.push('/login');
          } else {
            toast.error(ret.message, {
              position: toast.POSITION.TOP_CENTER
            });
          }
        }
      );
    } else {
      toast.error('Password do not match!', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  return (
    <>
      <MaxWidthBody>
        <Card.Title className="text-center mt-2">Registration</Card.Title>
        <hr className="m-0" />
        <Card.Body className="px-0">
          <p>Personal Information:</p>
          <Form onSubmit={handleSubmit}>
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

            <Form.Group className="mb-2" controlId="formBasicLastName">
              <Form.Label className="mb-0">Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
                placeholder="Enter Address"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formMobileNumer">
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
            <Form.Group className="mb-2" controlId="formBasicPassword">
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
            </Form.Group>

            <div className="d-grid gap-1 mt-3">
              <Button outline variant="primary" type="submit">
                Register
              </Button>
            </div>
          </Form>
        </Card.Body>
      </MaxWidthBody>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: props => dispatch(registerUser(props))
  };
};

export default connect(null, mapDispatchToProps)(RegistrationForm);
