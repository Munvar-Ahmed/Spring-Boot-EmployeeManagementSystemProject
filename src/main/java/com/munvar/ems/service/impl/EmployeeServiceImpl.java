package com.munvar.ems.service.impl;

import com.munvar.ems.dto.EmployeeDto;
import com.munvar.ems.entity.Department;
import com.munvar.ems.entity.Employee;
import com.munvar.ems.exception.ResourceNotFoundException;
import com.munvar.ems.mapper.EmployeeMapper;
import com.munvar.ems.repository.DepartmentRepository;
import com.munvar.ems.repository.EmployeeRepository;
import com.munvar.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private DepartmentRepository departmentRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Department department = departmentRepository.findById(employeeDto.getDepartmentId())
                .orElseThrow(()->new ResourceNotFoundException("Department with the given ID doesn't exist"+ employeeDto.getDepartmentId()));
        employee.setDepartment(department);
        Employee savedEmployee= employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee;
        try {
            employee = employeeRepository.findById(employeeId)
                    .orElseThrow(()->new ResourceNotFoundException("Employee with given ID doesn't exist"+ employeeId));
        } catch (ResourceNotFoundException e) {
            throw new RuntimeException(e);
        }
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();

        return employees.stream().map(emp-> EmployeeMapper.mapToEmployeeDto(emp)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployeeDto) {

        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee with given ID doesn't exist"+ employeeId));

        employee.setEmail(updatedEmployeeDto.getEmail());
        employee.setFirstName(updatedEmployeeDto.getFirstName());
        employee.setLastName(updatedEmployeeDto.getLastName());
        Department department = departmentRepository.findById(updatedEmployeeDto.getDepartmentId())
                .orElseThrow(()->new ResourceNotFoundException("Department with the given ID doesn't exist"+ updatedEmployeeDto.getDepartmentId()));
        employee.setDepartment(department);
        Employee updatedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deletedEmployee(Long employeeId) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee with given ID doesn't exist"+ employeeId));

        employeeRepository.deleteById(employeeId);

    }


}
