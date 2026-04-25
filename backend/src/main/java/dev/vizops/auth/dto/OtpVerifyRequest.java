package dev.vizops.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class OtpVerifyRequest {
    @Email @NotBlank
    private String email;
    @NotBlank @Size(min = 6, max = 6)
    private String otpCode;
}
