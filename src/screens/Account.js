import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import Footer from '../components/footer'
import AppNavbar from '../components/navbar'
import api from '../config'
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Account = () => {

    const [data, setData] = useState([])
    const [student, setStudent] = useState([])
    const [studentEdu, setStudentEdu] = useState([])
    const [studentExperience, setStudentExperience] = useState([])
    const [studentInfo, setStudentInfo] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('userid');
        const getUser = () => {
            axios.get(`${api.apiBaseUrl}/Student/GetByUserIdWithRelationShip?id=${token}`)
                .then(res => {
                    const { user } = res.data;
                    const { student } = res.data;
                    setStudent(student);
                    setData(user);
                    console.log(user);
                }).catch(err => {
                    console.log(err)
                })
        }

        const getStudentEducation = () => {
            axios.get(`${api.apiBaseUrl}/StudentEducation/GetAllByStudentIdWithRelationShip?id=${token}`)
                .then((res) => {
                    setStudentEdu(res.data);
                    
                })
                .catch((err) => {
                    console.log(err);
                });
        }


        const getStudentExperienceById = (id) => {
            axios.get(`${api.apiBaseUrl}/StudentExperience/GetAllByStudentIdWithRelationShip?id=${id}`)
                .then((res) => {
                    setStudentExperience(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        const getStudentCourseInfoById = (id) => {
            axios.get(`${api.apiBaseUrl}/StudentAdmissionDetail/GetAllStudentIdWithRelationShip?id=${id}`)
                .then((res) => {
                    setStudentInfo(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        getStudentCourseInfoById(token);
        getStudentExperienceById(token);
        getStudentEducation();
        getUser();

    }, []);






    return (
        <>
            <AppNavbar />
            <Container className="shadow rounded"> 
                <Row className="py-2 mx-auto">
                    <Col md={12}>
                        <h2 className='text-center text-primary my-3'>Student Details</h2>
                        <div className='d-flex justify-content-between my-3'>
                            <div className="fw-bold">Name:</div>
                            <div>{data.name}</div>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between my-3'>
                            <div className="fw-bold">Father Name:</div>
                            <div>{student.fatherName}</div>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between my-3'>
                            <div className="fw-bold">Date of birth:</div>
                            <div>{student.dob}</div>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between my-3'>
                            <div className="fw-bold">Present Address:</div>
                            <div>{student.presentAddress}</div>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between my-3'>
                            <div className="fw-bold">CNIC:</div>
                            <div>{student.cnic}</div>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between my-3'>
                            <div className="fw-bold">Father Occupation:</div>
                            <div>{student.fatherOccupation}</div>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between my-3'>
                            <div className="fw-bold">Gender:</div>
                            <div>{student.gender}</div>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between my-3'>
                            <div className="fw-bold">Father Monthly Income:</div>
                            <div>{student.fatherMonthlyIncome}</div>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between my-3'>
                            <div className="fw-bold">Average Monthly Household:</div>
                            <div>{student.avgMonthlyHouseHoldIncome}</div>
                        </div>
                        <hr />
                    </Col>
                    <Col md={12}>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Father Name</th>
                                    <th>Date of birth</th>
                                    <th>Present Address</th>
                                    <th>CNIC</th>
                                    <th>Father Occupation</th>
                                    <th>Gender</th>
                                    <th>Father Monthly Income</th>
                                    <th>Average Household Income</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{data.name}</td>
                                    <td>{student.fatherName}</td>
                                    <td>{student.dob}</td>
                                    <td>{student.presentAddress}</td>
                                    <td>{student.cnic}</td>
                                    <td>{student.fatherOccupation}</td>
                                    <td>{student.gender}</td>
                                    <td>{student.fatherMonthlyIncome}</td>
                                    <td>{student.avgMonthlyHouseHoldIncome}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className="py-2">
                    <Col md={12}>
                        <h2 className='text-center text-primary mb-4'>Education</h2>
                        <table className="table">
                            <thead className="thead ">
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Last Education Institute Name</th>
                                    <th scope="col">Education Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentEdu.map((e, i) => (
                                    <>
                                        <tr key={i}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{e.year}</td>
                                            <td>{e.schoolCollageUni}</td>
                                            <td>{e.degrees}</td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row className="py-2">
                    <Col md={12}>
                        <h2 className='text-center text-primary mb-4'>Experience</h2>
                        <table className="table">
                            <thead className="thead ">
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Company Name</th>
                                    <th scope="col">Designation</th>
                                    <th scope="col">Work From</th>
                                    <th scope="col">Work To</th>
                                    <th scope="col">Is Present</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentExperience.map((e, i) => (
                                    <>
                                        <tr key={i}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{e.companyName}</td>
                                            <td>{e.designation}</td>
                                            <td>{e.workFrom}</td>
                                            <td>{e.workTo}</td>
                                            <td>{e.isPresent}</td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row className="py-2">
                    <Col md={12}>
                        <h2 className='text-center text-primary mb-4'>Course Information</h2>
                        <table className="table">
                            <thead className="thead">
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Institute</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Course</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    studentInfo.map((e, i) => (
                                        <>
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{e.institute}</td>
                                                <td>{e.city}</td>
                                                <td>{e.course}</td>
                                            </tr>
                                        </>
                                    ))
                                }
                            </tbody>
                        </table>
                    </Col>
                    <div>
                        <Button variant="contained" className="my-4" onClick={() => navigate('/registration')} >Edit</Button>
                    </div>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Account