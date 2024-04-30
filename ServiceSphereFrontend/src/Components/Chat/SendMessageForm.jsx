import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import { useState } from 'react';

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    return (
        <Form onSubmit={e => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');
        }}>
            <InputGroup>
                <FormControl
                    type="text"
                    placeholder="send a message..."
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                />
                <button className='pill-button rounded-3'style={{'background':'black'}} type="submit" disabled={!message}>
                    Send
                </button>
            </InputGroup>
        </Form>
    );
}

export default SendMessageForm;
