import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosConfig';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

const ActionButton = ({ onClick, icon: Icon, color, title }) => (
  <button
    onClick={onClick}
    title={title}
    className={`text-white p-2 rounded hover:opacity-90 transition-colors duration-200 ${color}`}
  >
    <Icon />
  </button>
);

const AdminContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axiosInstance.get('/contact-us');
        setContacts(response.data.data || []);
      } catch (err) {
        console.error('Error fetching contact data:', err);
        setError('Failed to load contact submissions. Please try again later.');
      }
    };

    fetchContacts();
  }, []);



  const handleUpdate = (contact) => {
    alert(`Update logic for ${contact.name} goes here.`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axiosInstance.delete(`/contact-us/${id}`);
        setContacts((prev) => prev.filter((c) => c._id !== id));
      } catch (err) {
        console.error('Error deleting contact:', err);
        alert('Failed to delete contact. Please try again.');
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us Submissions</h2>

      {error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left py-3 px-4 border-b">Name</th>
                <th className="text-left py-3 px-4 border-b">Email</th>
                <th className="text-left py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">{contact.name}</td>
                    <td className="py-3 px-4 border-b">{contact.email}</td>
                    <td className="py-3 px-4 border-b space-x-2 flex">
                      <Link to={`${contact._id}`}>   <FaEye /></Link>
                      <ActionButton
                        onClick={() => handleUpdate(contact)}
                        icon={FaPen}
                        color="bg-yellow-500"
                        title="Edit"
                      />
                      <ActionButton
                        onClick={() => handleDelete(contact._id)}
                        icon={FaTrash}
                        color="bg-red-500"
                        title="Delete"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContactUs;
