import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import env from "../environment";

const EditUser = () => {
  const [member, setMember] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      fetch(`${env.apiurl}/users/edit-user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(member),
      })
        .then((data) => data.json())
        .then((response) => navigate("/dashboard"));
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    let res = axios
      .get(`${env.apiurl}/users/${id}`)
      .then((response) => setMember(response.data.data));
    console.log(res);
  }, [id]);

  return (
    <>
      <div className="login-wrapper">
        <div className="login">
          <h1>Edit Profile</h1>
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

            <div className="button-wrapper">
              <Button
                className="btn-login"
                variant="success"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default EditUser;
