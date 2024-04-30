import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import axios from 'axios'; // Import Axios for HTTP requests
import BASE_URL from '../../Variables';

function NotificationsSignalR() {
    const [messages, setMessages] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${BASE_URL}/notificationHub`)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection.on("ReceiveNotification", (message) => {
            console.log("Received message: ", message);
            setMessages(prevMessages => [...prevMessages, message]);
        });

        async function startConnection() {
            try {
                await connection.start();
                console.log("SignalR Connected.");
            } catch (err) {
                console.error('Error while starting connection: ' + err);
            }
        }

        startConnection();

        return () => {
            console.log("Stopping connection.");
            connection.stop();
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `${BASE_URL}/api/Assessments/SendNotificationToUser`;

        try {
            const response = await axios.post(url, {
                Message: notificationMessage
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user'), // Assuming the token is stored in localStorage
                }
            });

            console.log('Notification sent:', response.data);
            setNotificationMessage(''); // Clear the input field after successful submission
            alert('Notification sent successfully!');
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('Error sending notification: ' + error.message);
        }
    };

    const handleInputChange = (event) => {
        setNotificationMessage(event.target.value);
    };

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <label>
                    Notification Message:
                    <input
                        type="text"
                        value={notificationMessage}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Send Notification</button>
            </form>
        </div>
    );
}

export default NotificationsSignalR;
