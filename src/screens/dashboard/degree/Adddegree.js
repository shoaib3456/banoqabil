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

const Adddegree = () => {
    const [studentEducation, setStudentEducation] = useState([]);
    useEffect(() => {
        const getStudentEducation = async () => {
            await axios.get(`${api.apiBaseUrl}/StudentEducation/GetAll`).then((res) => {
                setStudentEducation(res.data);
                console.log(res.data);
            }
            )
                .catch((err) => {
                    console.log(err);
                }
                )
        }

        getStudentEducation();
    }, [])


    const validation = YUP.object().shape({
        name: YUP.string().required('Name is required'),
        studentEducationId: YUP.string().required('StudentEducation is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            studentEducationId: '',
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
                    <p style={{ color: 'red' }}>{formik.touched.name && formik.errors.name ? formik.errors.name : null}</p>
                </Box>


             



                <Box>
                    <InputLabel id="demo-simple-select-label">Student Education</InputLabel>
                    <select
                        value={formik.values.studentEducationId}
                        onChange={formik.handleChange('studentEducationId')}
                        onBlur={formik.handleBlur('studentEducationId')}

                    >
                        <option>Select city</option>
                        {studentEducation.map((studentEducation) => (
                            <option value={studentEducation.id}>{studentEducation.name}</option>
                        ))}

                    </select>
                    <p style={{ color: 'red' }}>{formik.touched.studentEducationId && formik.errors.studentEducationId ? formik.errors.studentEducationId : null}</p>
                </Box>






            </Box>
            <Box sx={{ marginLeft: 1, marginTop: 5 }}>
                <Button variant="contained" onClick={formik.handleSubmit}>SUBMIT</Button>
            </Box>
        </>
    )
}

export default Adddegree