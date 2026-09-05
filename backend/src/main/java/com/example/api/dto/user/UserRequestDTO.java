package com.example.api.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {

    @Size(max = 50, message = "Ime ne može biti duže od 50 karaktera")
    private String firstName;

    @Size(max = 50, message = "Prezime ne može biti duže od 50 karaktera")
    private String lastName;

    @NotBlank(message = "Email je obavezan")
    @Email(message = "Email mora biti u validnom formatu")
    @Size(max = 100, message = "Email ne može biti duži od 100 karaktera")
    private String email;

    @NotBlank(message = "Password je obavezan")
    @Size(max = 255, message = "Password ne može biti duži od 255 karaktera")
    private String password;

    @Min(value = 0, message = "Godine ne mogu biti negativne")
    private Integer age;
}
