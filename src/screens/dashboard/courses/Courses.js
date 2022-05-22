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

const Courses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchcourses = async () => {
            await axios.get(`${api.apiBaseUrl}/Course/GetAll`).then((res) => {
                setCourses(res.data);
                console.log(res.data);
            }
            )
                .catch((err) => {
                    console.log(err);
                }
                )
        }
        fetchcourses();
    }, [])

  return (
   <>
    <TableContainer component={Paper}>
      <Button variant="contained" onClick={() => navigate('/dashboard/addcourse')}>ADD Course</Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell >NAME</TableCell>
            <TableCell >DESCRIPTION</TableCell>
            <TableCell >BATCH</TableCell>
            <TableCell >ACTION</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow>
              <TableCell>{course.id}</TableCell>
              <TableCell >{course.name}</TableCell>
              <TableCell >{course.description}</TableCell>
              <TableCell >{course.batch}</TableCell>
              <TableCell >
                <Button variant="contained" onClick={() => navigate(`/dashboard/editcourse/${course.id}`)} color="primary">EDIT</Button>
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

export default Courses