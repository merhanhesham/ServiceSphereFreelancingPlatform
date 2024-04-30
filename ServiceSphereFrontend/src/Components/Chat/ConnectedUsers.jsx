const ConnectedUsers = ({ users }) => <div className='user-list rounded-3 '>
    <h4>Connected Users</h4>
    {users.map((u, idx) => <h6 key={idx}>{u}</h6>)}
</div>

export default ConnectedUsers;
