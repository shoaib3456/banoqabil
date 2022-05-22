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
import { Link, useNavigate } from 'react-router-dom';



const AddArea = () => {
  const [city, setCity] = useState([]);
  const [institute, setInstitute] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getcity = async () => {
      await axios.get(`${api.apiBaseUrl}/City/GetAll`).then((res) => {
        setCity(res.data);
        console.log(res.data);
      }
      )
        .catch((err) => {
          console.log(err);
        }
        )
    }
    const getinstitute = async () => {
      await axios.get(`${api.apiBaseUrl}/Institute/GetAll`).then((res) => {
        setInstitute(res.data);
        console.log(res.data);
      }
      )
        .catch((err) => {
          console.log(err);
        }
        )
    }

    getcity();
    getinstitute();
  }, [])

  const validation = YUP.object().shape({
    name: YUP.string().required('Name is required'),
    city: YUP.string().required('City is required'),

  });

  const formik = useFormik({
    initialValues: {
      name: '',
      city: '',

    },
    validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
      axios.post(`${api.apiBaseUrl}/Area/Add`, {
        name: values.name,
        cityId: parseInt(values.city),

      }).then((res) => {
        console.log(res.data);
      }
      )
        .catch((err) => {
          console.log(err);
        }
        )
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
          <InputLabel id="demo-simple-select-label">Area</InputLabel>
          <input value={formik.values.name} onChange={formik.handleChange('name')} onBlur={formik.handleBlur('name')} />
          <p style={{ color: 'red' }}>{formik.touched.name && formik.errors.name ? formik.errors.name : null}</p>
        </Box>
        <Box>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <select
            value={formik.values.city}
            onChange={formik.handleChange('city')}
            onBlur={formik.handleBlur('city')}

          >
            <option>Select city</option>
            {city.map((city) => (
              <option value={city.id}>{city.name}</option>
            ))}

          </select>
          <p style={{ color: 'red' }}>{formik.touched.city && formik.errors.city ? formik.errors.city : null}</p>
        </Box>





      </Box>
      <Box sx={{ marginLeft: 1, marginTop: 5 }}>
        <Button variant="contained" onClick={formik.handleSubmit}>
          <Link to="/dashboard/area" style={{ color: "#fff", textDecoration: "none" }}>Add</Link>
        </Button>
      </Box>
    </>
  )
}

export default AddArea