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
        background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          borderRadius: 4,
          width: '100%',
          maxWidth: 420,
          background: 'rgba(18, 18, 18, 0.7)',
          backdropFilter: 'blur(15px)',
          color: '#fff',
          textAlign: 'center',
          boxShadow: '0 0 20px rgba(230, 237, 237, 0.2)'
        }}
      >
        {/* Logo */}
        <Box mb={3}>
          <img src="https://img.icons8.com/ios-filled/50/00e5ff/visible.png" alt="eye" width={50} />
          <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold', color: '#00e5ff' }}>
            EyeBeat
          </Typography>
          <Typography variant="subtitle2" sx={{ color: '#90caf9' }}>
            Your Vision, Our AI
          </Typography>
        </Box>

        {/* Username */}
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            input: { color: '#fff' },
            mb: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#1a1a1a',
              borderRadius: 2,
              '& fieldset': { borderColor: '#00e5ff' },
              '&:hover fieldset': { borderColor: '#00bcd4' },
              '&.Mui-focused fieldset': { borderColor: '#00e5ff' },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon sx={{ color: '#00e5ff' }} />
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
          sx={{
            input: { color: '#fff' },
            mb: 3,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#1a1a1a',
              borderRadius: 2,
              '& fieldset': { borderColor: '#00e5ff' },
              '&:hover fieldset': { borderColor: '#00bcd4' },
              '&.Mui-focused fieldset': { borderColor: '#00e5ff' },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: '#00e5ff' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? (
                    <VisibilityOffIcon sx={{ color: '#00e5ff' }} />
                  ) : (
                    <VisibilityIcon sx={{ color: '#00e5ff' }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Login */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            py: 1.5,
            borderRadius: 3,
            fontWeight: 'bold',
            fontSize: '1rem',
            background: 'linear-gradient(90deg, #00e5ff, #007bff)',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.5)',
            '&:hover': {
              background: 'linear-gradient(90deg, #007bff, #00e5ff)',
            }
          }}
        >
          LOGIN
        </Button>

        {/* Register */}
        <Typography variant="body2" sx={{ mt: 4, color: '#90caf9', fontSize: '1rem' }}>
  Don’t have an account?
</Typography>

<Typography variant="body2" sx={{ mt: 1, fontSize: '1rem' }}>
  <Link href="/register" underline="hover" sx={{ color: '#00e5ff', fontWeight: 'bold' }}>
    Register as Patient
  </Link>{' '}
  |{' '}
  <Link href="/doctor-register" underline="hover" sx={{ color: '#00e5ff', fontWeight: 'bold' }}>
    Register as Doctor
  </Link>
</Typography>

      </Paper>
    </Box>
  );
};

export default Login;
