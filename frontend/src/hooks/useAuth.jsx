import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const useAuth = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      // Ensure the authUser and token are available
      if (!authUser || !authUser.token) {
        throw new Error('User is not authenticated');
      }

      const res = await axios.put('/api/users/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authUser.token}` // Attach the token
        }
      });

      // Assuming the response contains the updated user object
      const updatedUser = res.data;
      setAuthUser(updatedUser);
      localStorage.setItem('chat-user', JSON.stringify(updatedUser)); // Update local storage
      toast.success('Profile updated successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateUser };
};

export default useAuth;
