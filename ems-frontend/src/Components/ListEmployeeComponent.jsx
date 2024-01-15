import React, { useEffect, useState } from "react";
import { deleteEmp, listEmployees } from "../Services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const getAllEmployees = () => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error(error));
  };
  const addNewEmployee = () => navigate("/add-employee");

  const updateEmployee = (id) => navigate(`/update-employee/${id}`);

  function deleteEmployee(id) {
    console.log(id);
    deleteEmp(id)
      .then((response) => {
        console.log(response.data);
        getAllEmployees();
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee FirstName</th>
            <th>Employee LastName</th>
            <th>Employee Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.email}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateEmployee(emp.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger mr-2px"
                  onClick={() => deleteEmployee(emp.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
