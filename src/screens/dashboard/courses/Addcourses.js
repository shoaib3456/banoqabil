import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from 'axios';
import api from '../../../config';
import { useFormik } from 'formik';
import * as YUP from 'yup';

const Addcourses = () => {
    const [batch, setBatch] = useState([]);
    useEffect(() => {
        const getbatch = async () => {
            await axios.get(`${api.apiBaseUrl}/Batch/GetAll`).then((res) => {
                setBatch(res.data);
                console.log(res.data);
            }
            )
                .catch((err) => {
                    console.log(err);
                }
                )
        }

        getbatch();
    }, [])


    const validation = YUP.object().shape({
        name: YUP.string().required('Name is required'),
        description: YUP.string().required('Description is required'),
        batchId: YUP.string().required('Batch is required'),
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            batchId: '',
        },
        validationSchema: validation,
        onSubmit: (values) => {
            console.log(values);
        },
    });
    
  return (
      <>
    <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          display: 'flex',
        }}
        noValidate
        autoComplete="off"
      >
        <Box>
          <InputLabel id="demo-simple-select-label">Name</InputLabel>
          <input value={formik.values.name} onChange={formik.handleChange('name')} onBlur={formik.handleBlur('name')} />
          <p  style={{color:'red'}}>{formik.touched.name && formik.errors.name ? formik.errors.name : null}</p>
        </Box>


        <Box>
          <InputLabel id="demo-simple-select-label">Description</InputLabel>
          <input value={formik.values.description} onChange={formik.handleChange('description')} onBlur={formik.handleBlur('description')} />
          <p  style={{color:'red'}}>{formik.touched.description && formik.errors.description ? formik.errors.description : null}</p>
        </Box>



        <Box>
          <InputLabel id="demo-simple-select-label">Batch</InputLabel>
          <select
            value={formik.values.batchId}
            onChange={formik.handleChange('batchId')}
            onBlur={formik.handleBlur('batchId')}

          >
            <option>Select city</option>
            {batch.map((batch) => (
              <option value={batch.id}>{batch.name}</option>
            ))}

          </select>
          <p style={{color:'red'}}>{formik.touched.batchId && formik.errors.batchId ? formik.errors.batchId : null}</p>
        </Box>

       




      </Box>
      <Box sx={{ marginLeft: 1, marginTop: 5 }}>
        <Button variant="contained" onClick={formik.handleSubmit}>SUBMIT</Button>
      </Box>
      </>
  )
}

export default Addcourses