package com.munvar.ems.controller;

import com.munvar.ems.dto.EmployeeDto;
import com.munvar.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private EmployeeService employeeService;


    //Build Add Employee Rest API
@PostMapping
    public ResponseEntity<EmployeeDto> createEmployee( @RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee =employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }
@GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById( @PathVariable("id") Long employeeId){

    EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);

    return new ResponseEntity<>(employeeDto, HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(){

    List<EmployeeDto> employees = employeeService.getAllEmployees();

    return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId, @RequestBody EmployeeDto employeeDto){

    EmployeeDto updatedEmployee = employeeService.updateEmployee(employeeId, employeeDto);

    return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
    employeeService.deletedEmployee(employeeId);
        return new ResponseEntity<>("Employee deleted successfully", HttpStatus.OK);
    }












}


