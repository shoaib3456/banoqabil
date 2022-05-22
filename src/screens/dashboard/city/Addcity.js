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

const Addcity = () => {
    const validation = YUP.object().shape({
        name: YUP.string().required('Name is required'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validation,
        onSubmit: (values) => {
            console.log(values);
        },
    })

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
                    <p style={{ color: 'red' }}>{formik.touched.name && formik.errors.name ? formik.errors.name : null}</p>
                </Box>





                <Box sx={{ marginLeft: 1, marginTop: 5 }}>
                    <Button variant="contained" onClick={formik.handleSubmit}>SUBMIT</Button>
                </Box>
            </Box>
        </>
    )
}

export default Addcity