package hu.employee.controller;

import hu.employee.entity.Employee;
import hu.employee.service.EmployeeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeeController {
    private final EmployeeService employeeService;

    @PostMapping("/employee")
    public Employee postEmployee(@RequestBody final Employee employee) {
        return employeeService.postEmployee(employee);
    }

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable final Long id) {
        try {
            employeeService.deleteEmployee(id);
            return new ResponseEntity<>("Employee with ID(" + id + ") deleted!", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable final Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        if (employee == null) return ResponseEntity.notFound().build();
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @PutMapping("/employee/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable final Long id, @RequestBody final Employee employee) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employee);
        if (updatedEmployee == null) return ResponseEntity.notFound().build();
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }
}
