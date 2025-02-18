import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, Alert } from '@mui/material';
import { auth, signInWithEmailAndPassword } from './firebase'; 

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
    
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      onLogin(); 
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          width: 300,
          borderRadius: '8px',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center' }}>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: '#B6A08B' }}
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
