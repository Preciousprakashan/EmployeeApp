import * as React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    Grid2
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosinterception';
import './Home.css';


function Home() {
    const [employee, setemployee] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    useEffect(() => {
        axiosInstance.get('http://localhost:4001').then((res) => {
            setemployee(res.data);
        });
    }, []);




    const handleDelete = (id) => {
        axiosInstance.delete('http://localhost:4001/delete/' + id) // Make sure to use DELETE method
            .then(() => {
                // Navigate to a different page (e.g., a confirmation page or back to the home page)
                navigate('/Home');
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting employee:', error);
                // Optionally show an error message to the user
            });
    };



    const handleEdit = (id) => {
        // Fetch the employee details by _id
        axiosInstance.get('http://localhost:4001/' + id) // Fetch the employee data by _id
            .then((response) => {
                const employeeData = response.data; // Get the employee data

                // Pass the fetched employee data to the edit component
                navigate('/Edit', { state: { employeeData } }); // Use react-router's navigate with state
            })
            .catch((error) => {
                console.error('Error fetching employee data for edit:', error);
                // Optionally show an error message to the user
            });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Updated columns with additional fields
    const columns = [
        { id: 'empID', label: 'Employee ID', minWidth: 100 },
        { id: 'empName', label: 'Employee Name', minWidth: 170 },
        { id: 'empDesignation', label: 'Designation', minWidth: 170 },
        { id: 'empDepartment', label: 'Department', minWidth: 170 },
        { id: 'empLocation', label: 'Location', minWidth: 170 },
        { id: 'empSalary', label: 'Salary', minWidth: 170, align: 'right', format: (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
        {
            id: 'actions',
            label: 'Actions',
            minWidth: 170,
            align: 'center',
        },
    ];

    return (
        <>


            {/* <div id="carouselExampleDark" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://cdn.prod.website-files.com/63cfd421cd678e3860a446ee/66b9ce98a8ba8e759b77103d_64fed3e18c79d2f43bce0c0b_5393409.jpeg" className="d-block w-100" alt="First slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Introduction to Node.js
                            </h5>
                            <p>Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, allowing you to run JavaScript on the server-side.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://wallpaperaccess.com/full/314827.jpg" className="d-block w-100" alt="Second slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Asynchronous Programming</h5>
                            <p>Node.js uses an event-driven, non-blocking I/O model, making it efficient and suitable for data-intensive real-time applications.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://wallpaperaccess.com/full/1877565.png" className="d-block w-100" alt="Third slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Web Development Essentials</h5>
                            <p>Explore the key aspects of web development
                            </p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div> */}


            <Typography
                variant="h5"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontWeight: 400,
                    marginBottom: 2,
                    marginTop: '80px',
                    '::before': {
                        content: '""',
                        flexGrow: 1,
                        marginRight: '16px',
                        borderBottom: '2px solid rgba(0, 0, 0, 0.5)',
                    },
                    '::after': {
                        content: '""',
                        flexGrow: 1,
                        marginLeft: '16px',
                        borderBottom: '2px solid rgba(0, 0, 0, 0.5)',
                    }
                }}
            >
                Employee List
            </Typography>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align || 'left'}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employee
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                            <TableCell>{row.empID}</TableCell>
                                            <TableCell>{row.empName}</TableCell>
                                            <TableCell>{row.empDesignation}</TableCell>
                                            <TableCell>{row.empDepartment}</TableCell>
                                            <TableCell>{row.empLocation}</TableCell>
                                            <TableCell align="right">
                                                {columns.find(col => col.id === 'empSalary').format(row.empSalary)}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => handleEdit(row._id)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => handleDelete(row._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={employee.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

export default Home;