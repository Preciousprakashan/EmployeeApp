import { CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosinterception';

const Edit = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Provide a fallback if location.state or employeeData is undefined
    const { employeeData } = location.state || {};
    
    // Pre-fill the form with the fetched data or empty fields if employeeData is undefined
    const [employee, setemployee] = useState(employeeData || {
        empID: '',
        empName: '',
        empDesignation: '',
        empDepartment: '',
        empLocation: '',
        empSalary: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setemployee({ ...employee, [name]: value }); // Update the employee state with form input
    };

    const handleSubmit = () => {
        // Submit the updated employee data
        axiosInstance.put(`http://localhost:4001/edit/${employee._id}`, employee) // Use _id to update
            .then(() => {
                console.log('Employee updated successfully');
                navigate('/Home'); // Navigate back to the home page after success
                setTimeout(() => {
                alert('Employee updated successfully');
            }, 100); // 100ms delay to ensure navigation happens first
            })
            .catch((error) => {
                console.error('Error updating employee:', error);
            });
    };

    return (
        <>
            <Card sx={{ width: '100%', backgroundColor: '#ffffff', color: 'white' }}>
                <CardContent>
                    <h2>Edit Employee</h2>
                    <Box>
                        {/* Employee input fields */}
                        <TextField
                            onChange={handleChange}
                            name="employeeId"
                            label="Employee ID"
                            value={employee.empID || ''}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="employeeName"
                            value={employee.empName || ''}
                            label="Employee Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="empDesignation"
                            value={employee.empDesignation || ''}
                            label="Employee Designation"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="empDepartment"
                            value={employee.empDepartment || ''}
                            label="Employee Department"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="empLocation"
                            value={employee.empLocation || ''}
                            label="Employee Location"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            onChange={handleChange}
                            name="empSalary"
                            value={employee.empSalary || ''}
                            label="Employee Salary"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="number"
                        />
                        <Button variant="contained" onClick={handleSubmit}>
                            Update Employee
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default Edit;
