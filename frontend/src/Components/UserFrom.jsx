
import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const UserForm = ({ onSave, selectedUser }) => {
  const [user, setUser] = useState({ name: '', email: '', age: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    setUser(selectedUser || { name: '', email: '', age: '' });
  }, [selectedUser]);

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(user);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">{selectedUser ? 'Edit User' : 'Add User'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input type="text" name="name" value={user.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Age</label>
        <input type="number" name="age" value={user.age} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1" required />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600">
        {selectedUser ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;
