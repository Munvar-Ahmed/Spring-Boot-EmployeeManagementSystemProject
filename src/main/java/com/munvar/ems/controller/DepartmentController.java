package com.munvar.ems.controller;

import com.munvar.ems.dto.DepartmentDto;
import com.munvar.ems.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")

@RestController
@RequestMapping("/departments")
@AllArgsConstructor
public class DepartmentController {

    private DepartmentService departmentService;

    @PostMapping
    public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto){
        DepartmentDto savedDepartmentDto = departmentService.createDepartment(departmentDto);
        return new ResponseEntity<>(savedDepartmentDto, HttpStatus.CREATED);
    }
    @GetMapping("{id}")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable("id") Long id){
        DepartmentDto department =departmentService.getDepartmentById(id);
        return new ResponseEntity<>(department, HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<List<DepartmentDto>> getAllDepartments(){
        List<DepartmentDto> departments =departmentService.getAllDepartments();
        return new ResponseEntity<>(departments, HttpStatus.OK);
    }
    @PutMapping("{id}")
    public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable("id") Long id,
                                                          @RequestBody DepartmentDto departmentDto){
        DepartmentDto department = departmentService.updateDepartment(id, departmentDto);
        return ResponseEntity.ok(department);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable("id") Long id){
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok("Department Successfully deleted");
    }
}
