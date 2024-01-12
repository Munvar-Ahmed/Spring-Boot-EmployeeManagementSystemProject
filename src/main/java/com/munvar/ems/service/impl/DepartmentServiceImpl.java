package com.munvar.ems.service.impl;

import com.munvar.ems.dto.DepartmentDto;
import com.munvar.ems.entity.Department;
import com.munvar.ems.exception.ResourceNotFoundException;
import com.munvar.ems.mapper.DepartmentMapper;
import com.munvar.ems.repository.DepartmentRepository;
import com.munvar.ems.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department savedDepartment= departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public DepartmentDto getDepartmentById(Long id) {
        Department department = departmentRepository.findById(id).
                orElseThrow(()-> new ResourceNotFoundException("Department with given ID doesn't exists"+ id));
        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {
        List<Department> departments= departmentRepository.findAll();
        return departments.stream().map(dep->DepartmentMapper.mapToDepartmentDto(dep)).collect(Collectors.toList());
    }

    @Override
    public DepartmentDto updateDepartment(Long id, DepartmentDto departmentDto) {

        Department department= departmentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Department with the given ID doesn't exists"+ id));

        department.setDepartmentDescription(departmentDto.getDepartmentDescription());
        department.setDepartmentName(departmentDto.getDepartmentName());

        Department upatedDepartment=departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(upatedDepartment);
    }

    @Override
    public void deleteDepartment(Long id) {
        Department department= departmentRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Department with the given ID doesn't exists"+ id));
        departmentRepository.deleteById(id);
    }

    public void test(){}
}
