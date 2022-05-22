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





const Area = () => {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    const fetchareas = async () => {
      await axios.get(`${api.apiBaseUrl}/Area/GetAllWithRelationShip`).then((res) => {
        setAreas(res.data);
        console.log(res.data);
      }
      )
        .catch((err) => {
          console.log(err);
        }
        )
    }
    fetchareas();
  }, [])

  // const handledelete = async (id) => {
  //     await axios.delete(`${api.apiBaseUrl}/Area/Remove?id=${id}`).then((res) => {
  //       console.log(res.data);
  //       navigate('/dashboard/area');
  //     })

  // }



  return (
    <TableContainer component={Paper}>
      <Button variant="contained" onClick={() => navigate('/dashboard/addarea')}>ADD AREA</Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell >NAME</TableCell>
            <TableCell >CITY</TableCell>
            <TableCell >ACTION</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {areas.map((area) => (
            <TableRow>
              <TableCell>{area.id}</TableCell>
              <TableCell >{area.name}</TableCell>
              <TableCell >{area.city}</TableCell>
            
              <TableCell >
                <Button variant="contained" style={{
                  marginRight: '15px'
                }} onClick={() => navigate(`/dashboard/editarea/${area.id}`)} color="primary">EDIT</Button>
                {/* <Button onClick={ () =>handledelete(area.id)} variant="contained" color="secondary">DELETE</Button> */}
              </TableCell>

            </TableRow>
          )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Area