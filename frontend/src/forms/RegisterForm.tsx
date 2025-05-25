import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log("Form Data Submitted:", data);

    const response = await fetch(`${apiUrl}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log("Response:", response);
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

      <div>
        <label>Name:</label>
        <input
          {
            ...register('name', {
              required: 'Name is required'
            })}
          type="text"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      
      <button type="submit">Register</button>
    </form>
  )
};

export default RegisterForm;
