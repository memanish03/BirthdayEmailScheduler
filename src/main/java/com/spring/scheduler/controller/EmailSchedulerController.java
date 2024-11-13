package com.spring.scheduler.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.scheduler.entities.Employee;
import com.spring.scheduler.repository.EmployeeRepository;
import com.spring.scheduler.service.EmailService;



@RestController
@RequestMapping("/api/admin")
public class EmailSchedulerController {

    @Autowired
    private EmailService emailService;
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/send-birthday-emails")
    public ResponseEntity<String> triggerEmail() {
        emailService.scheduleBirthdayEmails();
        return ResponseEntity.ok("Birthday emails sent for today.");
    }
    
    
    //  end point to get upcoming birthdays
    @GetMapping("/getUpcomingBirthdays")
    public ResponseEntity<List<Employee>> getUpcomingBirthdays() {
        LocalDate today = LocalDate.now();
        List<Employee> upcomingBirthdays = employeeRepository.findUpcomingBirthdays(today.getMonthValue(), today.getDayOfMonth());
        return ResponseEntity.ok(upcomingBirthdays);
    }
    
    
    // end point to get all birthdays within a specified month
    @GetMapping("/getBirthdaysByMonth/{month}")
    public ResponseEntity<List<Employee>> getBirthdaysByMonth(@PathVariable int month) {
        List<Employee> monthlyBirthdays = employeeRepository.findAllBirthdaysInMonth(month);
        return ResponseEntity.ok(monthlyBirthdays);
    }
    
    
}

	