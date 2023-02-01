import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import env from "../environment";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { DownloadTableExcel, downloadExcel } from "react-export-table-to-excel";
import Header from "./Header";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const loadData = async () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      let res = await axios.get(`${env.apiurl}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.statusCode === 200) {
        setData(res.data.data);
      } else {
        alert(res.data.message);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    loadData();
  }, []);





  const handleDelete = async (id) => {
    let token = sessionStorage.getItem("token");
    if (token) {
      let res = await axios.delete(`${env.apiurl}/users/delete-user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.statusCode === 200) {
        loadData();
      } else {
        alert(res.data.message);
      }
    } else {
      navigate("/");
    }
  };

  let handleDownloadExcel = async () => {
    let body = [];
    data.map((e) => {
      body.push({
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        role: e.role,
        createdAt: e.createdAt,
      });
    });
    downloadExcel({
      fileName: "users table",
      sheet: "users",
      tablePayload: {
        header: ["First Name", "Last Name", "Email", "Role", "Created Date"],
        body: body,
      },
    });
  };
  return (
    <>
    <Header/>
      <div>
        <h1>Welcome to Dashboard</h1>
        <p>All your contents here</p>
      </div>
      <div>
        <Button variant="primary" onClick={() => handleDownloadExcel()}>
          Download
        </Button>
      </div>
      <div>
        <DownloadTableExcel
          filename="users table"
          sheet="users"
          currentTableRef={tableRef.current}
        ></DownloadTableExcel>
      </div>

      <div>
        <Table striped bordered hover ref={tableRef}>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>role</th>
              <th>Created At</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.firstName}</td>
                  <td>{e.lastName}</td>
                  <td>{e.email}</td>
                  <td>{e.role}</td>
                  <td>{e.createdAt}</td>
                  <td>
                    <Button onClick={()=>navigate("/edituser/"+e._id)}>Edit</Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(e._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Button variant="primary" onClick={loadData}>
          Refresh
        </Button>
        <div>
          
          </div>
      </div>
    </>
  );
};

export default Dashboard;
