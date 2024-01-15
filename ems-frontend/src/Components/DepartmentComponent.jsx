import { useEffect, useState } from "react";
import {
  createDepartmet,
  getDepartmentById,
  updateDepartment,
} from "../Services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getDepartmentById(id)
      .then((response) => {
        setDepartmentName(response.data.departmentName),
          setDepartmentDescription(response.data.departmentDescription);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const saveDepartment = (e) => {
    e.preventDefault();

    const department = { departmentName, departmentDescription };
    console.log(department);
    if (id) {
      updateDepartment(id, department)
        .then((response) => {
          console.log(response.data);
          navigate("/departments");
        })
        .catch((error) => console.error(error));
    } else {
      createDepartmet(department)
        .then((response) => {
          console.log(response.data);
          navigate("/departments");
        })
        .catch((error) => console.error(error));
    }
  };

  const pageTitle = () => {
    if (id) {
      return <h2 className="text-center">Update Department</h2>;
    } else {
      return <h2 className="text-center">Add Department</h2>;
    }
  };
  return (
    <div className="container">
      <br />
      <div className="card col-md-6 offset-md-3 offset-md-3">
        {pageTitle()}
        <div className="card-body">
          <form>
            <div className="form-group mb-2">
              <label className="form-label">Department Name:</label>
              <input
                type="text"
                name="department"
                placeholder="Enter Depart.. Name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="form-control"
              ></input>
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Department Description:</label>
              <input
                type="text"
                name="department description"
                placeholder="Enter Depart. description"
                value={departmentDescription}
                onChange={(e) => setDepartmentDescription(e.target.value)}
                className="form-control"
              ></input>
            </div>
          </form>
          <button
            className="btn btn-success"
            onClick={(e) => saveDepartment(e)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentComponent;
