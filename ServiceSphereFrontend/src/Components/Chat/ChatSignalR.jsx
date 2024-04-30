import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import BASE_URL from '../../Variables';

function Chat() {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${BASE_URL}/chatHub`)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log("SignalR Connected.");
                    connection.on('ReceiveMessage', (user, message) => {
                        setMessages(messages => [...messages, { user, message }]);
                    });
                })
                .catch(e => console.error('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async () => {
        if (connection) {
            await connection.invoke('SendPrivateMessage', 'b7bf0852-b679-4ee4-99ae-9e394929907e', input);
            setInput(''); // Clear input after sending
        }
    };

    return (
        <div>
            <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message here"
            />
            <button onClick={sendMessage}>Send</button>
            <div>
                {messages.map((msg, index) => (
                    <div key={index} style={{ margin: "10px 0", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
                        <strong>{msg.user}:</strong> {msg.message}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Chat;
