package dev.vizops.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class LoginRequest {
    @Email @NotBlank
    private String email;
    @NotBlank @Size(max = 72)
    private String password;
}
