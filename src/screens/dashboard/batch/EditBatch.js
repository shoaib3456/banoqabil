import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../config';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';


const EditBatch = () => {
    const { id } = useParams();
    const [batch, setBatch] = useState({});
    useEffect(() => {
        const fetchsinglebatch = async () => {
            await axios.get(`${api.apiBaseUrl}/Batch/GetById?id=${id}`).then((res) => {
                setBatch(res.data);
                console.log(res.data);
            }
            )
                .catch((err) => {
                    console.log(err);
                }
                )
        }
        fetchsinglebatch();
    }, [])
    const validation = YUP.object().shape({
        name: YUP.string().required('Name is required'),
        batchcode: YUP.string().required('Batch Code is required'),
        description: YUP.string().required('Description is required'),
    })
    const formik = useFormik({
        initialValues: {
            name: "" || batch.name,
            batchcode: "" || batch.batchCode,
            description: "" || batch.description,
        },
        validationSchema: validation,
        onSubmit: (values) => {
            console.log(values);
        }
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

export default EditBatch