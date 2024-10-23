import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to get the current URL
import './Navbars.css';

const Navbars = () => {
  const [bgColor, setBgColor] = useState('transparent');
  const [textColor, setTextColor] = useState('black'); // Initial text color
  const location = useLocation(); // Get current location

  const handleScroll = () => {
    if (location.pathname === '/Home') { // Only apply scroll effect on the '/Home' route
      if (window.scrollY > 30) {
        setBgColor('#ffffff'); // Change to white when scrolled
        setTextColor('#000000');
      } else {
        setBgColor('transparent'); // Change back to transparent
        setTextColor('black');
      }
    }
  };

  useEffect(() => {
    if (location.pathname === '/Home') {
      window.addEventListener('scroll', handleScroll);
    } else {
      // Set default styles for other routes
      setBgColor('#ffffff');
      setTextColor('#000000');
    }

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]); // Re-run useEffect when the route changes


  let clearUser=()=>{
    localStorage.removeItem('token');
    Navigate('/')
  }

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar 
        position="fixed" 
        sx={{
          backgroundColor: bgColor, // Dynamic background color based on route and scroll
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
          transition: 'background-color 0.5s ease', // Smooth transition for background
          '&:hover': {
            backgroundColor: '#ffffff', // Change background to white on hover
            color: '#000000', // Change text color to black on hover
            '& .MuiTypography-root, & .MuiButton-root': {
              color: '#000000', // Change typography and button text color to black on hover
            },
          },
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#ff4b2b', fontFamily: '"Satisfy", cursive', fontSize: '1.5rem' }}>
            EmployeeApp
            
          </Typography>
          <Link to={'/Home'}>
            <Button color="inherit" sx={{ fontFamily: '"Varela", sans-serif', color: textColor }}>Home</Button>
          </Link>
          <Link to={'/Add'}>
            <Button color="inherit" sx={{ color: textColor }}>Add employee</Button>
          </Link>
          <Link to={'/'}>
            <Button color="inherit" sx={{ color: textColor }} onClick={clearUser}>Logout</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbars;
