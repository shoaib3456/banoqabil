import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../config';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

const Editarea = () => {
  const { id } = useParams();
  const [area, setArea] = useState({});
  const [city, setCity] = useState([]);
  const [institute, setInstitute] = useState([]);

  useEffect(() => {
    const fetchsinglearea = async () => {
      await axios.get(`${api.apiBaseUrl}/Area/GetByIdWithRelationShip?id=${id}`).then((res) => {
        setArea(res.data);
        console.log(res.data);
      }
      )
        .catch((err) => {
          console.log(err);
        }
        )
    }

    const getcity = async () => {
      await axios.get(`${api.apiBaseUrl}/City/GetAll`).then((res) => {
        setCity(res.data);
        
      }
      )
        .catch((err) => {
          console.log(err);
        }
        )
    }

   
    getcity();

    fetchsinglearea();
  }, [])

  const validation = YUP.object().shape({
    name: YUP.string().required('Name is required'),
    cityId: YUP.string().required('City is required'),

  });


  const formik = useFormik({
    initialValues: {
      name: "" || area.name,
      cityId: "" || area.cityId,
    },
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
      // axios.post(`${api.apiBaseUrl}/Area/Update`, {
      //   id: parseInt(id),
      //   name: values.name,
      //   cityId: parseInt(values.city),
      //   instituteId: parseInt(values.institute),
      // }).then((res) => {
      //   console.log(res.data);
      // }
      // )
      //   .catch((err) => {
      //     console.log(err);
      //   }
      //   )
    }
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
            value={formik.values.cityId}
            onChange={formik.handleChange('cityId')}
            onBlur={formik.handleBlur('cityId')}

          >
            <option value={area.cityId}>{area.city}</option>
            {city.map((city) => (
              <option value={city.id}>{city.name}</option>
            ))}

          </select>
          <p style={{ color: 'red' }}>{formik.touched.city && formik.errors.city ? formik.errors.city : null}</p>
        </Box>

     



      </Box>
      <Box sx={{ marginLeft: 1, marginTop: 5 }}>
        <Button variant="contained" onClick={formik.handleSubmit}>SUBMIT</Button>
      </Box>
    </>
  )
}

export default Editarea