package com.example.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(max = 50, message = "Ime ne može biti duže od 50 karaktera")
    @Column(name = "first_name", length = 50)
    private String firstName;

    @Size(max = 50, message = "Prezime ne može biti duže od 50 karaktera")
    @Column(name = "last_name", length = 50)
    private String lastName;

    @Email(message = "Email mora biti u validnom formatu")
    @Size(max = 100, message = "Email ne može biti duži od 100 karaktera")
    @Column(name = "email", length = 100, unique = true)
    private String email;

    @Size(max = 255, message = "Password ne može biti duži od 255 karaktera")
    @Column(name = "password", length = 255)
    private String password;

    @Column(name = "age")
    private Integer age;
}
