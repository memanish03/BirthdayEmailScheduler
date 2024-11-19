import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Statistics.css"; // Add a styling file to beautify the page.

const Statistics = () => {
  const [todayLogs, setTodayLogs] = useState([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
  const [monthlyBirthdays, setMonthlyBirthdays] = useState([]);
  const [allLogs, setAllLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch logs for emails sent today
  const fetchTodayLogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/logs/today");
      setTodayLogs(response.data);
    } catch (err) {
      setError("Error fetching today's logs.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch upcoming birthdays
  const fetchUpcomingBirthdays = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/birthdays/upcoming");
      setUpcomingBirthdays(response.data);
    } catch (err) {
      setError("Error fetching upcoming birthdays.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch birthdays for the month
  const fetchMonthlyBirthdays = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/birthdays/month");
      setMonthlyBirthdays(response.data);
    } catch (err) {
      setError("Error fetching monthly birthdays.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all email logs
  const fetchAllLogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/logs/all");
      setAllLogs(response.data);
    } catch (err) {
      setError("Error fetching all email logs.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchTodayLogs();
    fetchUpcomingBirthdays();
    fetchMonthlyBirthdays();
    fetchAllLogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="statistics-container">
      <h1>Statistics</h1>
      <section className="stats-section">
        <h2>Emails Sent Today</h2>
        {todayLogs.length > 0 ? (
          <ul>
            {todayLogs.map((log, index) => (
              <li key={index}>
                Email to: {log.emailId}, Status: {log.status}, Timestamp:{" "}
                {new Date(log.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No emails sent today.</p>
        )}
      </section>

      <section className="stats-section">
        <h2>Upcoming Birthdays</h2>
        {upcomingBirthdays.length > 0 ? (
          <ul>
            {upcomingBirthdays.map((birthday, index) => (
              <li key={index}>
                {birthday.name} - {new Date(birthday.birthday).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming birthdays.</p>
        )}
      </section>

      <section className="stats-section">
        <h2>Birthdays This Month</h2>
        {monthlyBirthdays.length > 0 ? (
          <ul>
            {monthlyBirthdays.map((birthday, index) => (
              <li key={index}>
                {birthday.name} - {new Date(birthday.birthday).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No birthdays this month.</p>
        )}
      </section>

      <section className="stats-section">
        <h2>All Email Logs</h2>
        {allLogs.length > 0 ? (
          <ul>
            {allLogs.map((log, index) => (
              <li key={index}>
                Email to: {log.emailId}, Status: {log.status}, Timestamp:{" "}
                {new Date(log.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No email logs available.</p>
        )}
      </section>
    </div>
  );
};

export default Statistics;
