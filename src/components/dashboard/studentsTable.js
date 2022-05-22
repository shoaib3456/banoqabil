import React from 'react'
import { Button, Table } from 'react-bootstrap'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../config';

const StudentsTable = ({ formData }) => {

  const [batches, setBatches] = useState([]);

  useEffect(() => {
    axios.get(`${api.apiBaseUrl}/Batch/GetAll`)
      .then(res => {
        setBatches(res.data);
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
  }, [])



  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>
            <Button>
              <ModeEditIcon />
            </Button>
            &nbsp;
            <Button>
              <DeleteIcon />
            </Button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>
            <Button>
              <ModeEditIcon />
            </Button>
            &nbsp;
            <Button>
              <DeleteIcon />
            </Button>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>
            <Button>
              <ModeEditIcon />
            </Button>
            &nbsp;
            <Button>
              <DeleteIcon />
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default StudentsTable