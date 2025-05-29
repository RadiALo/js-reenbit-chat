import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
};

type LoginFormProps = {
  onLoginSuccess?: (token: string) => void;
  onLoginError?: (error: string) => void;
}

const RegisterForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onLoginError }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Login failed: ${errorData.message}`);
      onLoginError?.(errorData.message);
      return;
    }

    const jsonData = await response.json();
    localStorage.setItem('token', jsonData.token);
    localStorage.setItem('userId', jsonData.userId);
    localStorage.setItem('expireDate', jsonData.expireDate);
    onLoginSuccess?.(jsonData.token.token);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input
          {
            ...register('email', {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
            })
          }
        />

        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input
          {
            ...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Min length 6' }
            })}
          type="password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      
      <button className="button" type="submit">Login</button>
    </form>
  )
};

export default RegisterForm;
