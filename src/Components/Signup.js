import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import env from "../environment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Signup = () => {
  const [member, setMember] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();


  const handleSignup = async () => {
    let res= await axios.post(`${env.apiurl}/users/signup`, member)
    if(res.data.statusCode===200){
      alert(res.data.message)
      navigate("/")
    }
    else{
      alert("Error")

    }
  };
  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="login-wrapper"> 
        <div className="login">
          <h1>Signup</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={member.firstName}
                placeholder="Enter FirstName"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={member.lastName}
                placeholder="Enter lastName"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={member.email}
                placeholder="Enter email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={member.password}
                placeholder="Password"
                onChange={handleChange}
              />
            </Form.Group>

            <div className="button-wrapper">
              <Button className="btn-login" variant="primary" onClick={() => handleSignup()}>
                Signup
              </Button>
              <div>Or</div>
              <Button className="btn-login" variant="primary" onClick={() => navigate("/")}>
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Signup;