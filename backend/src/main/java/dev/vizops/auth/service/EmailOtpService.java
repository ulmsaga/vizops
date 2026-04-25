package dev.vizops.auth.service;

import dev.vizops.auth.model.OtpRecord;
import dev.vizops.auth.model.User;
import dev.vizops.auth.repository.OtpRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.SecureRandom;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailOtpService {
    private final OtpRepository otpRepository;
    private final JavaMailSender mailSender;
    private final SecureRandom random = new SecureRandom();

    @Value("${app.otp.expiry-minutes}") private int expiryMinutes;
    @Value("${app.otp.from-email}") private String fromEmail;
    @Value("${app.otp.from-name}") private String fromName;

    @Transactional
    public void sendOtp(User user) {
        otpRepository.invalidateAllForUser(user);

        String code = String.format("%06d", random.nextInt(1_000_000));

        OtpRecord otp = new OtpRecord();
        otp.setUser(user);
        otp.setOtpCode(code);
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(expiryMinutes));
        otpRepository.save(otp);

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(String.format("%s <%s>", fromName, fromEmail));
        msg.setTo(user.getEmail());
        msg.setSubject("[VizOps] 로그인 인증 코드");
        msg.setText(String.format(
            "안녕하세요 %s님,\n\n로그인 인증 코드: %s\n\n유효시간: %d분\n\nVizOps Team",
            user.getName(), code, expiryMinutes
        ));
        mailSender.send(msg);
        log.info("OTP sent to {}", user.getEmail());
    }

    @Transactional
    public boolean verifyOtp(User user, String code) {
        return otpRepository.findTopByUserAndUsedFalseOrderByCreatedAtDesc(user)
                .filter(otp -> !otp.isExpired() && otp.getOtpCode().equals(code))
                .map(otp -> { otp.setUsed(true); otpRepository.save(otp); return true; })
                .orElse(false);
    }
}
