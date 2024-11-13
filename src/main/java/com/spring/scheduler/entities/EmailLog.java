package com.spring.scheduler.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "email_logs")
public class EmailLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long employeeId;
    private String status;  // success or failure
    private LocalDateTime timestamp;
    private String emailId; // 

    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	 public void setEmailId(String emailId) {
	        this.emailId = emailId;
	    }

	    
	 public EmailLog(Long id, Long employeeId, String status, LocalDateTime timestamp, String emailId) {
	        this.id = id;
	        this.employeeId = employeeId;
	        this.status = status;
	        this.timestamp = timestamp;
	        this.emailId = emailId;
	    }

	 
	    public EmailLog() {
	        super();
	    }
	
	
	
  
}

