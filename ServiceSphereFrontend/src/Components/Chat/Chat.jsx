import SendMessageForm from './SendMessageForm';
import MessageContainer from './MessageContainer';
import ConnectedUsers from './ConnectedUsers';
import { Button } from 'react-bootstrap';

const Chat = ({ sendMessage, messages, users, closeConnection }) => <div>
    <div className='leave-room'>
        <button className='pill-button rounded-3' style={{'background':'black'}}  onClick={() => closeConnection()}>Leave Room</button>
    </div>
    <ConnectedUsers users={users} />
    <div className='chat'>
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage} />
    </div>
</div>

export default Chat;
