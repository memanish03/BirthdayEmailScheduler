import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Dashboard.css';
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [date, setDate] = useState(new Date());
    const [birthdays, setBirthdays] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch employee data from CSV via backend
    useEffect(() => {
        const fetchBirthdays = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/birthdays');
                const data = await response.json();

                // Create a birthday map where the date is the key 
                const birthdayMap = {};
                data.forEach((employee) => {
                    const [year, month, day] = employee.birthday.split('-'); 
                    const formattedDate = `${month}-${day}`; 

                    if (!birthdayMap[formattedDate]) {
                        birthdayMap[formattedDate] = [];
                    }
                    birthdayMap[formattedDate].push(employee.name);
                });

                setBirthdays(birthdayMap);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchBirthdays();
    }, []);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
    };

    const formatDate = (date) => {
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0'); 
        return `${month}-${day}`; 
    };

    const formattedSelectedDate = formatDate(date);
    const birthdayList = birthdays[formattedSelectedDate] || [];

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = formatDate(date);
            if (birthdays[formattedDate]) {
                return 'birthday-tile'; 
            }
            return 'no-birthday-tile'; 
        }
        return null;
    };

    return (
        <div className="dashboard">
            <h1>Birthday Dashboard</h1>
            <Calendar
                onClickDay={handleDateChange}
                value={date}
                tileClassName={tileClassName}
            />
            {loading ? (
                <p>Loading birthdays...</p>
            ) : birthdayList.length > 0 ? (
                <div>
                <h3>Happy Birthday to:</h3>
                <div>
                    {birthdayList.map((name, index) => (
                        <div key={index}>{name}</div>
                    ))}
                </div>
            </div>
            
            ) : (
                <p>No birthdays today!</p>
            )}
            <Link to="/email-editor">
                <button className="nav-button">Go to Email Template Editor</button>
            </Link>
            <Link to="/statistics">
                <button className="nav-button">View Statistics</button>
            </Link>

        </div>
    );
};

export default Dashboard;
