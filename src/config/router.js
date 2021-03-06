import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Home, Signup, Login, Registration, Dashboard, Students, Area, AddArea, EditArea, Batch, AddBatch, EditBatch, City, AddCity, EditCity, Courses, EditCourse, AddCourse, Degree, AddDegree, EditDegree, DataCard, Account, AdmitCard } from "./index"
import { useSelector } from 'react-redux';





const AppRouter = () => {
    const [auth, setAuth] = useState(false);
    const authstate = useSelector(state => state.loginReducer);
    const { isLoggedIn, role } = authstate;
    useEffect(() => {
        console.log(isLoggedIn);

    }, []);


    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {
                        <>
                            isLoggedIn  ?
                            <>
                                <Route path="/registration" element={ isLoggedIn ?  <Registration /> : <Login /> } />
                                <Route path="/account" element={ isLoggedIn ?  <Account /> : <Login />}  />
                                <Route path="/admitCard" element={ isLoggedIn ?  <AdmitCard /> : <Login />}  />
                                {
                                    role === "admin" ?
                                        <>
                                            <Route path="/dashboard" element={<Dashboard />} >
                                                <Route path="students" element={<Students />} />
                                                <Route path="area" element={<Area />} />
                                                <Route path="area/add" element={<AddArea />} />
                                                <Route path="area/edit/:id" element={<EditArea />} />
                                                <Route path="batch" element={<Batch />} />
                                                <Route path="batch/add" element={<AddBatch />} />
                                                <Route path="batch/edit/:id" element={<EditBatch />} />
                                                <Route path="city" element={<City />} />
                                                <Route path="city/add" element={<AddCity />} />
                                                <Route path="city/edit/:id" element={<EditCity />} />
                                                <Route path="courses" element={<Courses />} />
                                                <Route path="courses/add" element={<AddCourse />} />
                                                <Route path="courses/edit/:id" element={<EditCourse />} />
                                                <Route path="degrees" element={<Degree />} />
                                                <Route path="degrees/add" element={<AddDegree />} />
                                                <Route path="degrees/edit/:id" element={<EditDegree />} />
                                                <Route path="datacard" element={<DataCard />} />
                                                <Route path="account" element={<Account />} />
                                            </Route>

                                        </>
                                        :
                                        <>
                                            <Route path="/registration" element={<Navigate to={isLoggedIn ? "/registration" : "/login"} replace />} />
                                            <Route path="/account" element={<Navigate to={isLoggedIn ? "/account" : "/login"} replace />} />
                                            <Route path="/admitCard" element={<Navigate to={isLoggedIn ? "/admitCard" : "/login"} replace />} />
                                        </>
                                }

                            </>
                            <>
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                            </>

                        </>
                    }

                </Routes>
            </Router>


        </>

    )
}

export default AppRouter