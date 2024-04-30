import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Chat.css';
const Lobby = ({ joinRoom }) => {
    const [user, setUser] = useState();
    const [room, setRoom] = useState();

    return <Form className='lobby'
        onSubmit={e => {
            e.preventDefault();
            joinRoom(user, room);
        }} >
        <Form.Group>
            <Form.Control placeholder="UserName" onChange={e => setUser(e.target.value)} className='mb-2' />
            <Form.Control placeholder="RoomName" onChange={e => setRoom(e.target.value)} />
        </Form.Group>
        <button className='pill-button rounded-3 mt-4'type="submit" disabled={!user || !room}>Join</button>
    </Form>
}

export default Lobby;