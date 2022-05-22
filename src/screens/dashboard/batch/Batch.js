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

const Batch = () => {
    const navigate = useNavigate();
    const [batches, setBatches] = useState([]);
    useEffect(() => {
        const fetchBatch = async () => {
            await axios.get(`${api.apiBaseUrl}/Batch/GetAll`).then((res) => {
                setBatches(res.data);
                console.log(res.data);
            }
            )
                .catch((err) => {
                    console.log(err);
                }
                )
        }
        fetchBatch();
    }, [])
  return (
    <TableContainer component={Paper}>
      <Button variant="contained" onClick={() => navigate('/dashboard/addbatch')}>ADD BATCH</Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell >NAME</TableCell>
            <TableCell >BATCH CODE</TableCell>
            <TableCell >DESCRIPTION</TableCell>
            <TableCell >ACTION</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {batches.map((batch) => (
            <TableRow>
              <TableCell>{batch.id}</TableCell>
              <TableCell >{batch.name}</TableCell>
              <TableCell >{batch.batchCode}</TableCell>
              <TableCell >{batch.description}</TableCell>
              <TableCell >
                <Button variant="contained" onClick={() => navigate(`/dashboard/editbatch/${batch.id}`)} color="primary">EDIT</Button>
                <Button variant="contained" color="secondary">DELETE</Button>
              </TableCell>

            </TableRow>
          )
          )}


        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Batch