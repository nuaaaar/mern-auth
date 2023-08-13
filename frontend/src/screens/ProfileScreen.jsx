import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.auth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo]);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password.length > 0 && password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      const result = await updateProfile({ 
        _id: userInfo._id,
        name, 
        email, 
        password
      }).unwrap();
      dispatch(setCredentials({ ...result }));
      toast.success('Profile Updated');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  return (
    <FormContainer>
      <h1>Profile</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          {isLoading ? <>
            <Loader style={
              { width: '1.25rem', height: '1.25rem' }
            } /> <span>Updating...</span>
          </> : 'Update'}
        </Button>

        <Row className="py-3">
          <Col>
            Already have an account? <Link to="/login">Sign In</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default ProfileScreen