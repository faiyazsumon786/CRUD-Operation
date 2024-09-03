
// eslint-disable-next-line react/prop-types
const UserList = ({ users = [], onEdit, onDelete }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      {users.length ? (
        <ul className="space-y-4">
          {users.map(({ _id, name, email, age }) => (
            <li key={_id} className="flex justify-between items-center p-4 border-b border-gray-200">
              <div>
                <p className="text-gray-800 font-medium">{name}</p>
                <p className="text-gray-600">{email}</p>
                <p className="text-gray-600">Age: {age}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => onEdit({ _id, name, email, age })} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button onClick={() => onDelete(_id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No users available.</p>
      )}
    </div>
  );
  
  export default UserList;
  