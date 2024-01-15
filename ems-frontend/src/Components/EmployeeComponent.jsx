import { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmp,
} from "../Services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setEmail(response.data.email);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log(employee);
      if (id) {
        updateEmp(id, employee)
          .then((response) => {
            console.log(response.data);
            navigate("/employees");
          })
          .catch((error) => console.errror(error));
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigate("/employees");
          })
          .catch((error) => console.errror(error));
      }
    }
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center"> Add Employee </h2>;
    }
  }
  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is requried";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is requried";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  return (
    <div className="container mt-2">
      <div className="card ">
        {pageTitle()}
        <div className="card-body">
          <form>
            <div className="form-group mb-2">
              <label className="form-label">First Name:</label>
              <input
                type="text"
                placeholder="Enter First Name.."
                name="firstName"
                value={firstName}
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
              {errors.firstName && (
                <div className="invalid-feedback"> {errors.firstName}</div>
              )}
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Last Name:</label>
              <input
                type="text"
                placeholder="Enter Last Name.."
                name="lastName"
                value={lastName}
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
              {errors.lastName && (
                <div className="invalid-feedback"> {errors.lastName}</div>
              )}
            </div>
            <div className="form-group mb-2">
              <label className="form-label">Email Id:</label>
              <input
                type="text"
                placeholder="Enter Last Name.."
                name="email"
                value={email}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <button className="btn btn-success" onClick={saveEmployee}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
