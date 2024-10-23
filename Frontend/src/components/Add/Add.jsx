import { CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosinterception';

const Addemployee = () => {
    const navigate = useNavigate();

    // Initialize empty employee data for adding a new employee
    const [employee, setemployee] = useState({
        empId: '',
        empName: '',
        empDesignation: '',
        empDepartment: '',
        empLocation: '',
        empSalary: 0
    });

    const handleChange = (e) => {
      const { name, value } = e.target; // Extract the 'name' and 'value' from the event's target (the input element)
      setemployee({ ...employee, [name]: value }); // Update the 'employee' state with the new input value
  };

    const handleSubmit = () => {
        // Submit the new employee data
        axiosInstance.post('http://localhost:4001/addEmployee', employee) // POST to create a new employee
            .then(() => {
                console.log('Employee added successfully');
                navigate('/Home'); // Navigate back to the home page after success
                setTimeout(() => {
                    alert('Employee added successfully');
                }, 100); // 100ms delay to ensure navigation happens first
            })
            .catch((error) => {
                console.error('Error adding employee:', error);
            });
    };

    return (
        <>
            <Card sx={{ width: '100%', backgroundColor: '#ffffff', color: 'white' }}>
                <CardContent>
                    <h2>Add New Employee</h2>
                    <Box>
                        {/* Employee input fields */}
                        <TextField
                            onChange={handleChange}
                            name="empId"
                            label="Employee ID"
                            value={employee.empID}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="empName"
                            value={employee.empName}
                            label="Employee Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="empDesignation"
                            value={employee.empDesignation}
                            label="Employee Designation"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="empDepartment"
                            value={employee.empDepartment}
                            label="Employee Department"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="empLocation"
                            value={employee.empLocation}
                            label="Employee Location"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="empSalary"
                            value={employee.empSalary}
                            label="Employee Salary"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="number"
                        />
                        <Button variant="contained" onClick={handleSubmit}>
                            Add Employee
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default Addemployee;
