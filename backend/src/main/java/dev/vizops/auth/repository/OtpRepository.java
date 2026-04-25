package dev.vizops.auth.repository;

import dev.vizops.auth.model.OtpRecord;
import dev.vizops.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface OtpRepository extends JpaRepository<OtpRecord, Long> {
    Optional<OtpRecord> findTopByUserAndUsedFalseOrderByCreatedAtDesc(User user);

    @Modifying
    @Query("UPDATE OtpRecord o SET o.used = true WHERE o.user = :user AND o.used = false")
    void invalidateAllForUser(User user);
}
