import { useEffect, useState } from "react";
import { deleteDepart, getAllDepartments } from "../Services/DepartmentService";
import { Link, useNavigate } from "react-router-dom";

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getDepartments();
  }, []);

  function getDepartments() {
    getAllDepartments().then((response) => setDepartments(response.data));
  }

  function createDepartment() {
    navigate("/add-department");
  }

  function updateDepartment(id) {
    navigate(`/update-department/${id}`);
  }

  function removeDepartment(id) {
    console.log(id);
    deleteDepart(id)
      .then((response) => {
        console.log(response.data);
        getDepartments();
      })
      .catch((error) => console.error(error));
    navigate("/departments");
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Departments</h2>
      <Link
        to="/add-department"
        className="btn btn-primary mb-2"
        onClick={createDepartment}
      >
        Add Department
      </Link>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Deapartment Name</th>
            <th>Department Description</th>
            <th> Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dep) => (
            <tr key={dep.id}>
              <td>{dep.id}</td>
              <td>{dep.departmentName}</td>
              <td>{dep.departmentDescription}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateDepartment(dep.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeDepartment(dep.id)}
                  style={{ marginLeft: "5px" }}
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

export default ListDepartmentComponent;
