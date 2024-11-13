package com.spring.scheduler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.spring.scheduler.entities.EmailTemplate;

@Repository
public interface EmailTemplateRepository extends JpaRepository<EmailTemplate, Long> {

	 @Query(value = "SELECT * FROM email_templates ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
	    EmailTemplate findRandomTemplate();
	
	
}
