package com.munvar.ems.service;

import com.munvar.ems.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employeeId);

    List<EmployeeDto> getAllEmployees();


    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployeeDto);


    void deletedEmployee(Long employeeId);
    }

