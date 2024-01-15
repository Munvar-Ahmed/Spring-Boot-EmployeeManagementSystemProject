import axios from "axios";

const DEPARTMENT_REST_API_BASE_URL = "http://localhost:8080/departments";

export const getAllDepartments = () => axios.get(DEPARTMENT_REST_API_BASE_URL);

export const createDepartmet = (department) =>
  axios.post(DEPARTMENT_REST_API_BASE_URL, department);

export const getDepartmentById = (departmentId) =>
  axios.get(DEPARTMENT_REST_API_BASE_URL + "/" + departmentId);

export const updateDepartment = (departmentId, department) =>
  axios.put(DEPARTMENT_REST_API_BASE_URL + "/" + departmentId, department);

export const deleteDepart = (departmentId) =>
  axios.delete(DEPARTMENT_REST_API_BASE_URL + "/" + departmentId);
