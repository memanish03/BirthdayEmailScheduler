package com.spring.scheduler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.scheduler.entities.EmailLog;

@Repository
public interface EmailLogRepository extends JpaRepository<EmailLog, Long>{

}
