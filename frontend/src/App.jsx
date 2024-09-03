// src/App.jsx
import { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import UserForm from './Components/UserFrom';
import UserList from './Components/UserList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setUsers(await getUsers());
    } catch (error) {
      console.error('Fetching users failed:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async (user) => {
    // eslint-disable-next-line no-useless-catch
    try {
      selectedUser ? await updateUser(selectedUser._id, user) : await createUser(user);
      fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Deleting user failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">CRUD Application</h1>
      <div className="w-full max-w-4xl grid gap-8 md:grid-cols-2">
        <UserForm onSave={handleSave} selectedUser={selectedUser} />
        <UserList users={users} onEdit={setSelectedUser} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
