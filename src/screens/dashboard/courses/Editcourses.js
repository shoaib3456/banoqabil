import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../config';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

const Editcourses = () => {
    const { id } = useParams();
    const [courses, setCourses] = useState({});
    const [batch, setBatch] = useState([]);

    useEffect(() => {
        const fetchsinglecourses = async () => {
            await axios.get(`${api.apiBaseUrl}/Courses/GetById?id=${id}`).then((res) => {
                setCourses(res.data);
                console.log(res.data);
            }
            )
                .catch((err) => {
                    console.log(err);
                }
                )
        }

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
        fetchsinglecourses();
    }, [])

    const validataion = YUP.object().shape({
        name: YUP.string().required('Name is required'),
        description: YUP.string().required('Description is required'),
        batchId: YUP.string().required('Batch is required'),
    })

    const formik = useFormik({
        initialValues: {
            name: "" || courses.name,
            description: "" || courses.description,
            batchId: "" || courses.batchId,
        },
        validationSchema: validataion,
        onSubmit: (values) => {
            console.log(values);
            axios.put(`${api.apiBaseUrl}/Courses/Update`, values).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
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
                    <InputLabel id="demo-simple-select-label">Description</InputLabel>
                    <input value={formik.values.description} onChange={formik.handleChange('description')} onBlur={formik.handleBlur('description')} />
                    <p style={{ color: 'red' }}>{formik.touched.description && formik.errors.description ? formik.errors.description : null}</p>
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
                    <p style={{ color: 'red' }}>{formik.touched.batchId && formik.errors.batchId ? formik.errors.batchId : null}</p>
                </Box>






            </Box>
            <Box sx={{ marginLeft: 1, marginTop: 5 }}>
                <Button variant="contained" onClick={formik.handleSubmit}>SUBMIT</Button>
            </Box>
        </>
    )
}

export default Editcourses