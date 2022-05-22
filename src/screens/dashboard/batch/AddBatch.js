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

const AddBatch = () => {

    const validation = YUP.object().shape({
        name: YUP.string().required('Name is required'),
        batchcode: YUP.string().required('Batchcode is required'),
        description: YUP.string().required('Description is required'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            batchcode: '',
            description: '',
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
                <Box>
                    <InputLabel id="demo-simple-select-label">Batch Code</InputLabel>
                    <input value={formik.values.batchcode} onChange={formik.handleChange('batchcode')} onBlur={formik.handleBlur('batchcode')} />
                    <p style={{ color: 'red' }}>{formik.touched.batchcode && formik.errors.batchcode ? formik.errors.batchcode : null}</p>
                </Box>
                <Box>
                    <InputLabel id="demo-simple-select-label">Description</InputLabel>
                    <input value={formik.values.description} onChange={formik.handleChange('description')} onBlur={formik.handleBlur('description')} />
                    <p style={{ color: 'red' }}>{formik.touched.description && formik.errors.description ? formik.errors.description : null}</p>
                </Box>




                <Box sx={{ marginLeft: 1, marginTop: 5 }}>
                    <Button variant="contained" onClick={formik.handleSubmit}>SUBMIT</Button>
                </Box>
            </Box>
        </>
    )
}

export default AddBatch