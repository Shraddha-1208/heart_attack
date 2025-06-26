import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
    const role = response.data.role;
    const loggedInUsername = response.data.user.username;

    // ✅ Store in localStorage
    localStorage.setItem("username", loggedInUsername);
    localStorage.setItem("role", role);

    // ✅ Navigate based on role
    if (role === 'admin') navigate('/admin');
    else if (role === 'patient') navigate('/home');
    else if (role === 'doctor') navigate('/doctor');
    else alert('Unknown role');
  } catch (error) {
    alert('Invalid credentials');
  }
};


  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f4f6f9">
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
        
        <TextField 
          label="Username" 
          fullWidth 
          margin="normal" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="secondary" onClick={handleLogin}>
            Login
          </Button>
        </Box>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" gutterBottom>
            Don't have an account?
          </Typography>
          <Typography variant="body2">
            <Link href="/register" underline="hover">Register as Patient</Link> |{' '}
            <Link href="/doctor-register" underline="hover">Register as Doctor</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
