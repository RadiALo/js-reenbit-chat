import React from 'react';
import RegisterForm from '../forms/RegisterForm';
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  return (
    <div>
      <h1>Register Page</h1>
      <RegisterForm />
      <p>
        Already have an account? <Link to='/login'>Login here</Link>.
      </p>
    </div>
  );
}

export default Register;