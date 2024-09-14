// Login.js
import React, { useState } from 'react';
import { login } from './auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      console.log('Logged in successfully:', user);
      // Redirect to dashboard or other protected route
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    // Your existing JSX code
    <form onSubmit={handleSubmit}>
      {/* Your existing form fields */}
    </form>
  );
};