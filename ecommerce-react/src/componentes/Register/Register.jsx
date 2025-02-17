import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Register.css';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    //const API_URL = import.meta.env.VITE_API_URL;
    const API_URL = 'http://localhost:3000';

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post(`${API_URL}/api/auth/register`, { nombre, apellido, email, password });
          console.log('Registrando usuario:', response.data);
          navigate('/login'); // Redirigir al login después de registrarse
      } catch (error) {
          console.error('Error al registrar usuario:', error);
          setError('Error al registrar usuario');
      }
  };

    return (
        <div className="register">
            <h3>ya esta registrado ?</h3>
            <Link to="/login"> loguearse </Link>
            <h2>Registro de Usuarios</h2>
            <form onSubmit={handleRegister}>
            <div className="form-group">
                    <label>Nombre:</label>
                    <input className ="input" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Apellido:</label>
                    <input className ="input" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input className ="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input className ="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className='registrarse'>Registrarse</button>
            </form>
        </div>
    );
};

export default Register;


// Fazt :
/*
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        {registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-3xl font-bold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            name="username"
            placeholder="Write your name"
            {...register("username")}
            autoFocus
          />
          {errors.username?.message && (
            <p className="text-red-500">{errors.username?.message}</p>
          )}

          <Label htmlFor="email">Email:</Label>
          <Input
            name="email"
            placeholder="youremail@domain.tld"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            name="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}

          <Label htmlFor="confirmPassword">Confirm Password:</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="********"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}
          <Button>Submit</Button>
        </form>
        <p>
          Already Have an Account?
          <Link className="text-sky-500" to="/login">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;
*/



// Ejemplo Turco:
/*
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserModel from "../model/userModel";

const SignUp = () => {
  const [formValues, setFormValues] = useState(new UserModel({}));

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formValues.username) {
      errors.username = "Username is required";
    } else if (!/^[A-Za-z0-9_]{3,15}$/.test(formValues.username)) {
      errors.username =
        "Username should be 3-15 characters long and can only contain letters, numbers, and underscores.';";
    }

    if(!formValues.email){
errors.email="Email is required"
    }else if(!/\S+@\S+\.\S+/.test(formValues.email)){
      errors.email="Please enter a valid email address"
    }
    if (!formValues.mobile) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formValues.mobile)) {
      errors.mobile = 'Mobile number should be 10 digits';
    }

    if (!formValues.password) {
      errors.password = 'Password is required';
    }
return errors;
};

  const handleSubmit=async (e)=>{
    e.preventDefault();
    console.log(formValues);
    
    const errors=validateForm();
    console.log(errors);
    if(Object.keys(errors).length===0){
      // alert("Form submitted")
    }else{
      // alert("Form Submission Failed");
      setFormErrors(errors);
    }
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register-user", formValues);
      console.log(response, 'res');

      if (response.data.success) {
          toast.success(response.data.message || 'Registration successful!');
          setFormValues({username:"",email:"",mobile:"",password:""});
          setFormErrors("");
      } else {
          toast.error(response.data.message || 'Registration failed!');
      }
  } catch (error) {
      console.error('Error during registration:', error);
      toast.error(error.response.data.message || "Something went wrong. Please try again later.");
  }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
  };
  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
           
          />
         {formErrors.username?<span className="error-message">{formErrors.username}</span>:''} 
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formValues.email}
            onChange={handleInputChange}
          />
          {formErrors.email?<span className="error-message">{formErrors.email}</span>:''} 
        </div>
        <div className="form-group">
          <label>Mobile No</label>
          <input
            type="tel"
            name="mobile"
            placeholder="Enter your mobile number"
            value={formValues.mobile}
            onChange={handleInputChange}
          />
          {formErrors.mobile?<span className="error-message">{formErrors.mobile}</span>:''} 
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          {formErrors.password?<span className="error-message">{formErrors.password}</span>:''} 
        </div>
        <button type="submit" className="login-btn">
          Sign Up
        </button>
      </form>
      <p style={{ textAlign: "center" }}>
        Already have an account?{" "}
        <Link
          to="/login"
          className="toggle-link"
          style={{ color: "#007BFF", textDecoration: "underline" }}
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
*/