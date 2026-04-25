package dev.vizops.auth.service;

import dev.vizops.auth.dto.AuthResponse;
import dev.vizops.auth.dto.LoginRequest;
import dev.vizops.auth.dto.OtpVerifyRequest;
import dev.vizops.auth.model.User;
import dev.vizops.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailOtpService emailOtpService;
    private final JwtService jwtService;

    public void login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .filter(u -> u.isEnabled() && passwordEncoder.matches(req.getPassword(), u.getPasswordHash()))
                .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다."));
        emailOtpService.sendOtp(user);
    }

    public AuthResponse verifyOtp(OtpVerifyRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        if (!emailOtpService.verifyOtp(user, req.getOtpCode())) {
            throw new IllegalArgumentException("인증 코드가 올바르지 않거나 만료되었습니다.");
        }
        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token, user.getEmail(), user.getName());
    }
}
