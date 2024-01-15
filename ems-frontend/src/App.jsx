import "./App.css";
import DepartmentComponent from "./Components/DepartmentComponent";
import EmployeeComponent from "./Components/EmployeeComponent";
import FooterComponent from "./Components/FooterComponent";
import HeaderComponent from "./Components/HeaderComponent";
import ListDepartmentComponent from "./Components/ListDepartmentComponent";
import ListEmployeeComponent from "./Components/ListEmployeeComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<ListEmployeeComponent />}></Route>
          <Route path="/employees" element={<ListEmployeeComponent />}></Route>
          <Route path="/add-employee" element={<EmployeeComponent />}></Route>
          <Route
            path="/update-employee/:id"
            element={<EmployeeComponent />}
          ></Route>
          <Route
            path="/departments"
            element={<ListDepartmentComponent />}
          ></Route>
          <Route
            path="/add-department"
            element={<DepartmentComponent />}
          ></Route>
          <Route
            path="/update-department/:id"
            element={<DepartmentComponent />}
          ></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
};

export default App;
