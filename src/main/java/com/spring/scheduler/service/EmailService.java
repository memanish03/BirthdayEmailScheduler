package com.spring.scheduler.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.spring.scheduler.entities.EmailLog;
import com.spring.scheduler.entities.EmailTemplate;
import com.spring.scheduler.entities.Employee;
import com.spring.scheduler.repository.EmailLogRepository;
import com.spring.scheduler.repository.EmailTemplateRepository;
import com.spring.scheduler.repository.EmployeeRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmailTemplateRepository templateRepository;

    @Autowired
    private EmailLogRepository logRepository;

    @Autowired
    private SendGridService sendGridService;

    @Scheduled(cron = "0 0 9 * * ?")  // Runs daily at 9 AM
    public void scheduleBirthdayEmails() {
    	Date today = Date.valueOf(LocalDate.now());
    	List<Employee> employees = employeeRepository.findByBirthday(today);

       
        
        employees.forEach(employee -> System.out.println(employee.getName()));

        logger.info("Scheduled task started: Sending birthday emails for {} employees", employees.size());

        for (Employee employee : employees) {
            sendBirthdayEmail(employee);
        }
        
        logger.info("Scheduled task completed: All birthday emails sent for the day.");
    }

    public void sendBirthdayEmail(Employee employee) {
        EmailTemplate template = templateRepository.findRandomTemplate(); // Fetch a unique template each time

        if (template != null) {
            String content = String.format(template.getMessageBody(), employee.getName());
            String subject = String.format(template.getSubject(), employee.getName()); // Replace %s with employee's name
            boolean isSuccess = sendGridService.sendEmail(employee.getEmail(), subject, content, template.getImageUrl());

            EmailLog log = new EmailLog();
            log.setEmployeeId(employee.getId());
            log.setStatus(isSuccess ? "success" : "failure");
            log.setTimestamp(LocalDateTime.now());
            log.setEmailId(employee.getEmail());
            logRepository.save(log);
            

            if (isSuccess) {
                logger.info("Birthday email successfully sent to {} (ID: {})", employee.getEmail(), employee.getId());
            } else {
                logger.error("Failed to send email to {} (ID: {})", employee.getEmail(), employee.getId());
            }
        } else {
            logger.warn("No email template found. Skipping email for employee: {}", employee.getEmail());
        }
    }

}

