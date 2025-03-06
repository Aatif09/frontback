import { useState } from 'react';
import axios from 'axios';
import './App.css'
function Crud() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [updateName, setUpdateName] = useState('');

  // Fetch all users
  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:3000/api/usersjson');
    setUsers(res.data);
  };

  // Fetch user by ID
  const fetchUserById = async () => {
    const res = await axios.get(`http://localhost:3000/api/usersjson/${userId}`);
    alert(JSON.stringify(res.data));
  };

  // Add a new user
  const addUser = async () => {
    await axios.post('http://localhost:3000/api/usersjson', {
      name: userName,
      age: userAge
    });
    alert('User added successfully');
    setUserName('');
    setUserAge('');
    fetchUsers();
  };

  // Update a user by ID
  const updateUser = async () => {
    await axios.patch(`http://localhost:3000/api/usersjson/${userId}`, { name: updateName });
    alert('User updated successfully');
    setUpdateName('');
    fetchUsers();
  };

  // Delete a user by ID
  const deleteUser = async () => {
    await axios.delete(`http://localhost:3000/api/usersjson/${userId}`);
    alert('User deleted successfully');
    fetchUsers();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Management</h1>

      <button onClick={fetchUsers}>Get All Users</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}, Age: {user.age}</li>
        ))}
      </ul>

      <hr />

      <div>
        <h3>Get User by ID</h3>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={fetchUserById}>Get User</button>
      </div>

      <hr />

      <div>
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Enter User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter User Age"
          value={userAge}
          onChange={(e) => setUserAge(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      <hr />

      <div>
        <h3>Update User Name by ID</h3>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter New Name"
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
        />
        <button onClick={updateUser}>Update User</button>
      </div>

      <hr />

      <div>
        <h3>Delete User by ID</h3>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={deleteUser}>Delete User</button>
      </div>
    </div>
  );
}

export default Crud;
