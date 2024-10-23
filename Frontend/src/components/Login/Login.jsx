import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosinterception';

const Login = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const updateUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const sentData = async () => {
        try {
            const response = await axiosInstance.post("http://localhost:4001/user", user);
            console.log(response.data); // Log the response for debugging

            if (response.data.usertoken) {
                localStorage.setItem("token", response.data.usertoken); // Save the token
                alert('Welcome ' + user.username);
                navigate('/Home'); // Navigate to Home on successful login
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <Box sx={{ width: '300px', margin: 'auto', paddingTop: '100px' }}>
            <h2>Login</h2>
            <TextField
                required
                label="Username"
                name='username'
                value={user.username}
                onChange={updateUser}
                fullWidth
            />
            <br /><br />
            <TextField
                label="Password"
                type="password"
                name='password'
                value={user.password}
                onChange={updateUser}
                fullWidth
            />
            <br /><br />
            <Button variant="outlined" onClick={sentData} sx={{ width: '100%' }}>Login</Button>
        </Box>
    );
};

export default Login;
