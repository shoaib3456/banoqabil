import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../config';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

const Editdegree = () => {
    const { id } = useParams();
    const [degree, setDegree] = useState({});
    const [studentEducation, setStudentEducation] = useState([]);

    useEffect(() => {
        const fetchsingledegree = async () => {
            await axios.get(`${api.apiBaseUrl}/Degree/GetById?id=${id}`).then((res) => {
                setDegree(res.data);
                console.log(res.data);
            }
            )
                .catch((err) => {
                    console.log(err);
                }
                )
        }

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
        fetchsingledegree();
    }, [])

    const validation = YUP.object().shape({
        name: YUP.string().required('Name is required'),
        studentEducationId: YUP.string().required('StudentEducation is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: "" ||degree.name,
            studentEducationId: "" || degree.studentEducationId,
        },
        validationSchema: validation,
        onSubmit: (values) => {
            console.log(values);
            axios.put(`${api.apiBaseUrl}/Degree/Update`, values).then((res) => {
                console.log(res);
            }
            )
                .catch((err) => {
                    console.log(err);
                })
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

export default Editdegree