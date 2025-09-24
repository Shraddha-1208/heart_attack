// Imports
import React, { useState } from 'react';
import {
  Box, Button, Paper, TextField, Typography, InputAdornment, Link, IconButton
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const role = response.data.role;
      const loggedInUsername = response.data.user.username;
      const uhid = response.data.user.uhid;

      localStorage.setItem("username", loggedInUsername);
      localStorage.setItem("role", role);
      if (role === 'patient' && uhid) {
        localStorage.setItem("uhid", uhid);
      } else {
        localStorage.removeItem("uhid");
      }

      if (role === 'admin') navigate('/admin');
      else if (role === 'patient') navigate('/home');
      else if (role === 'doctor') navigate('/doctor');
      else alert('Unknown role');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 3,
          width: '100%',
          maxWidth: 420,
          textAlign: 'center',
          backgroundColor: '#fff',
        }}
      >
        {/* Logo */}
        <Box mb={3}>
          <img src="https://img.icons8.com/ios-filled/50/000000/visible.png" alt="eye" width={50} />
          <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold', color: '#333' }}>
            EyeBeat
          </Typography>
          <Typography variant="subtitle2" sx={{ color: '#777' }}>
            See the Future of Your Heart.
          </Typography>
        </Box>

        {/* Username */}
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon sx={{ color: '#666' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Password */}
        <TextField
          variant="outlined"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: '#666' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? (
                    <VisibilityOffIcon sx={{ color: '#666' }} />
                  ) : (
                    <VisibilityIcon sx={{ color: '#666' }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Login Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontWeight: 'bold',
            fontSize: '1rem',
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          LOGIN
        </Button>

        {/* Register Links */}
        <Typography variant="body2" sx={{ mt: 4, color: '#555', fontSize: '1rem' }}>
          Don’t have an account?
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, fontSize: '1rem' }}>
          <Link href="/register" underline="hover" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Register as Patient
          </Link>{' '}
          |{' '}
          <Link href="/doctor-register" underline="hover" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Register as Doctor
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
