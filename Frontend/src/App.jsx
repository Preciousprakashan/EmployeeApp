// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './App.css';
import Home from './components/Home/Home';
import Add from './components/Add/Add';
import Navbars from './components/Navbars/Navbars';
import CarouselSlider from './components/CarouselSlider/CarouselSlider';
import Edit from './components/Edit/Edit';
import Login from './components/Login/Login'; // Import the Login component
import { PrivateRoutes } from './components/PrivateRoutes/PrivateRoutes';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} /> {/* Login route */}
      
      <Route element={<PrivateRoutes />}>
        <Route 
          path='/Home' 
          element={
            <>
              <Navbars /> {/* Only show Navbars on Home */}
              <CarouselSlider />
              <Home />
            </>
          } 
        />
        <Route 
          path='/Edit' 
          element={
            <>
              <Navbars />
              <Edit />
            </>
          } 
        />
        <Route 
          path='/Add' 
          element={
            <>
              <Navbars />
              <Add />
            </>
          } 
        />
      </Route>  
    </Routes>
  );
}

export default App;
