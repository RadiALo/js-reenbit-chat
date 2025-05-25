import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../forms/LoginForm';

const Register: React.FC = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm />
      <p>
        Don't have an account? <Link to='/register'>Register here</Link>.
      </p>
    </div>
  );
}

export default Register;