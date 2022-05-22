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

const City = () => {
    const navigate = useNavigate();
    const [cities, setCities] = useState([]);
    useEffect(() => {
        const fetchCity = async () => {
            await axios.get(`${api.apiBaseUrl}/City/GetAll`).then((res) => {
                setCities(res.data);
                console.log(res.data);
            }
            )
                .catch((err) => {
                    console.log(err);
                }
                )
        }
        fetchCity();
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Button variant="contained" onClick={() => navigate('/dashboard/addcity')}>ADD CITY</Button>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell >NAME</TableCell>
                            <TableCell >ACTION</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cities.map((city) => (
                            <TableRow>
                                <TableCell>{city.id}</TableCell>
                                <TableCell >{city.name}</TableCell>

                                <TableCell >
                                    <Button variant="contained" onClick={() => navigate(`/dashboard/editcity/${city.id}`)} color="primary">EDIT</Button>
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

export default City