package hu.employee.service;

import hu.employee.entity.Employee;
import hu.employee.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public Employee postEmployee(final Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new EntityNotFoundException("Employee not found");
        }
        employeeRepository.deleteById(id);
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee updateEmployee(Long id, Employee employee) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if (optionalEmployee.isPresent()) {
            Employee employeeToUpdate = optionalEmployee.get();
            employeeToUpdate.setName(employee.getName());
            employeeToUpdate.setEmail(employee.getEmail());
            employeeToUpdate.setPhone(employee.getPhone());
            employeeToUpdate.setDepartment(employee.getDepartment());

            return employeeRepository.save(employeeToUpdate);
        }
        return null;
    }
}
