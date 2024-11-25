package com.spring.scheduler.service;

import com.spring.scheduler.entities.Employee;
import com.spring.scheduler.entities.EmailTemplate;
import com.spring.scheduler.repository.EmailLogRepository;
import com.spring.scheduler.repository.EmailTemplateRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class EmailServiceTest {

    @InjectMocks
    private EmailService emailService; // Service being tested

    @Mock
    private EmailTemplateRepository templateRepository;

    @Mock
    private EmailLogRepository logRepository;

    @Mock
    private SendGridService sendGridService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
    }

    @Test
    void testResendFailedEmail() {
        // Mock Employee object
        Employee employee = new Employee();
        employee.setId(1L);
        employee.setName("John Doe");
        employee.setEmail("invalid-email@example.com"); // Simulate invalid email

        // Mock EmailTemplate object
        EmailTemplate template = new EmailTemplate();
        template.setMessageBody("Happy Birthday, {employee_name}!");
        template.setImageUrl("http://example.com/image.jpg");

        // Mock repository to return the template
        when(templateRepository.findRandomTemplate()).thenReturn(template);

        // Mock SendGridService to simulate email failure
        when(sendGridService.sendEmail(anyString(), anyString(), anyString(), anyString())).thenReturn(false);

        // Call the method being tested
        boolean result = emailService.resendFailedEmail(employee);

        // Assertions
        assertFalse(result, "Resend should fail for invalid email");

        // Verify that the logRepository was called to save the failure log
        verify(logRepository, times(1)).save(argThat(log ->
            log.getEmployeeId().equals(1L) &&
            log.getStatus().equals("failure") &&
            log.getError().contains("SendGrid failed to resend email")
        ));
    }
}
