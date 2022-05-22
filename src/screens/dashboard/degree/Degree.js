import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import api from '../../../config';
import axios from 'axios';


const Degree = () => {

    const navigate = useNavigate();
    const [degrees, setDegrees] = useState([]);
    useEffect(() => {
        const fetchDegrees = async () => {
            await axios.get(`${api.apiBaseUrl}/Degree/GetAll`).then((res) => {
                setDegrees(res.data);
                console.log(res.data);
            }
            )
                .catch((err) => {
                    console.log(err);
                }
                )
        }
        fetchDegrees();
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Button variant="contained" onClick={() => navigate('/dashboard/adddegree')}>ADD DEGREE</Button>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell >NAME</TableCell>
                            <TableCell >STUDENT EDUCATION</TableCell>
                            <TableCell >ACTION</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {degrees.map((degree) => (
                            <TableRow>
                                <TableCell>{degree.id}</TableCell>
                                <TableCell >{degree.name}</TableCell>
                                <TableCell >{degree.studentEducation}</TableCell>
                              
                                <TableCell >
                                    <Button variant="contained" onClick={() => navigate(`/dashboard/editdegree/${degree.id}`)} color="primary">EDIT</Button>
                                    <Button variant="contained" color="secondary">DELETE</Button>
                                </TableCell>

                            </TableRow>
                        )
                        )}


                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Degree