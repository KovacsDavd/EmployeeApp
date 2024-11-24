package hu.employee.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    private String phone;

    private String department;
}
