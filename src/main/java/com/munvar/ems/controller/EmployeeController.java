package com.munvar.ems.controller;

import com.munvar.ems.dto.EmployeeDto;
import com.munvar.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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



}


