import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppNavbar from "../components/navbar";
import Footer from "../components/footer";
import api from "../config";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';

const steps = ['Registration', 'Education', 'Experience', 'Course Information'];

const Registration = () => {
  const [edu, setEdu] = useState([]);
  const [exp, setexp] = useState([]);
  const [crs, setcrs] = useState([]);
  const [degrees, setdegrees] = useState([]);
  const [designations, setdesignations] = useState([]);
  const [district, setdistrict] = useState([]);
  const [studentEdu, setStudentEdu] = useState([]);
  const [studentExp, setStudentExp] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);

  const [institutes, setInstitutes] = useState([]);
  const [cities, setcities] = useState([]);
  const [courses, setcourses] = useState([]);


  const [checkRegistration, setCheckRegistration] = useState(true);


  const navigate = useNavigate();

  // Stepper
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    navigate("/account");
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  // Stepper


  useEffect(() => {
    if (localStorage.getItem('token')) {
      GetByUserIdWithRelationShip();
      getDistrict();
      getDegrees();
      getDesignation();
      getStudentById(localStorage.getItem('studentid'));
      getStudentExperienceById(localStorage.getItem('studentid'));
      getStudentCourseInfoById(localStorage.getItem('studentid'));
      getInstitutes();
      getCities();
      getCourses();
    } else {
      navigate("/login", { replace: true });
    }


  }, []);


  const [photoErr, setphotoErr] = useState(null);
  const [photo, setphoto] = useState(null);
  const [photoExt, setphotoExt] = useState(null);


  const handleFile = async (e) => {

      if (e.target.files[0].name.toUpperCase().indexOf('PNG') != -1 || e.target.files[0].name.toUpperCase().indexOf('JPG') != -1 || e.target.files[0].name.toUpperCase().indexOf('GIF') != -1 || e.target.files[0].name.toUpperCase().indexOf('JPEG') != -1) {
        setphotoErr("")
        let base64 = await convertBase64(e.target.files[0]);
        base64 = base64.split(',')[1]
        setphoto(base64)
        let photoExt = e.target.files[0].type.split('/')[1]
        setphotoExt(photoExt);
        console.log(base64);
      }
      else {
        setphotoErr("File not supported (supported format is jpg,png,gif and jpeg ) ")
      }
  }


  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  const GetByUserIdWithRelationShip = () => {
    axios.get(`${api.apiBaseUrl}/Student/GetByUserIdWithRelationShip?id=${localStorage.getItem('userid')}`)
      .then(res => {
        // setStudentInfo(res.data);
        
        console.log(res.data.student.id);
        localStorage.setItem('studentid', res.data.student.id);

        if (res.status === 200) {
          setCheckRegistration(false);
          handleNext();
        } else {
          localStorage.removeItem('studentid');
          setCheckRegistration(true);
        }

      }).catch(err => {
        localStorage.removeItem('studentid');
        console.log(err);
      });
  }

  const getDegrees = () => {
    axios.get(`${api.apiBaseUrl}/Degree/GetAll`)
      .then((res) => {
        setdegrees(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Degrees

  //Designation
  const getDesignation = () => {
    axios.get(`${api.apiBaseUrl}/Designation/GetAll`)
      .then((res) => {
        setdesignations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //Designation


  //District
  const getDistrict = () => {
    axios.get(`${api.apiBaseUrl}/District/GetAll`)
      .then((res) => {
        setdistrict(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  //get students by id
  const getStudentById = (id) => {
    axios.get(`${api.apiBaseUrl}/StudentEducation/GetAllByStudentIdWithRelationShip?id=${id}`)
      .then((res) => {
        setStudentEdu(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //get experience by id
  const getStudentExperienceById = (id) => {
    axios.get(`${api.apiBaseUrl}/StudentExperience/GetAllByStudentIdWithRelationShip?id=${id}`)
      .then((res) => {
        setStudentExp(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  //get course info by id
  const getStudentCourseInfoById = (id) => {
    axios.get(`${api.apiBaseUrl}/StudentAdmissionDetail/GetAllStudentIdWithRelationShip?id=${id}`)
      .then((res) => {
        setStudentInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  //get institute
  const getInstitutes = () => {
    axios.get(`${api.apiBaseUrl}/Institute/GetAll`)
      .then((res) => {
        setInstitutes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //get city
  const getCities = () => {
    axios.get(`${api.apiBaseUrl}/City/GetAll`)
      .then((res) => {
        setcities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //get course
  const getCourses = () => {
    axios.get(`${api.apiBaseUrl}/Course/GetAll`)
      .then((res) => {
        setcourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  const validate = Yup.object({
    CNIC: Yup.string()
      .matches(/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/, "Invalid CNIC example: 12345-1234567-1")
      .required("CNIC is Required"),
    gender: Yup.string().required("Select Gender"),
    fatherName: Yup.string().required("Father Name is Required"),
    monthlyIncome: Yup.string().required("monthly Income is Required"),
    fatherOccupation: Yup.string().required("Father Occupation is Required"),
    mobileNumber: Yup.string()
      .required("This field is Required")
      .matches(/^\d{11}$/, "Phone number is not valid"),
    dob: Yup.date().required("Date Of Birth is Required"),
    avgMonthlyHouseHoldIncome: Yup.string().required("Average monthly household income is Required"),
    // district: Yup.string().required("District is Required"),

    presentaddress: Yup.string().required("Address is Required"),

  });

  const formik = useFormik({
    initialValues: {
      CNIC: "",
      gender: "",
      fatherName: "",
      monthlyIncome: "",
      fatherOccupation: "",
      mobileNumber: "",
      dob: "",
      avgMonthlyHouseHoldIncome: "",
      district: 0,
      presentaddress: "",
      sportsPerson: "",
      hafiz: "",
      disablity: "",
      dumb: "",
      physicalDisablity: "",
      blind: "",
      deaf: "",
      widow: "",
      orphan: "",

    },
    validationSchema: validate,
    onSubmit: (values, { resetForm }) => {

      const data = {
        cnic: values.CNIC,
        gender: values.gender,
        fatherName: values.fatherName,
        fatherMonthlyIncome: values.monthlyIncome.toString(),
        fatherOccupation: values.fatherOccupation,
        mobile: values.mobileNumber,
        dob: values.dob,
        avgMonthlyHouseHoldIncome: values.avgMonthlyHouseHoldIncome,
        districtId: parseInt(values.district),
        presentAddress: values.presentaddress,
        sportsPerson: values.sportsPerson === "Yes" ? true : false,
        hafizQuran: values.hafiz === "Yes" ? true : false,
        disablity: values.disablity === "Yes" ? true : false,
        dumb: values.dumb === "Yes" ? true : false,
        physicalDisability: values.physicalDisablity === "yes" ? true : false,
        blind: values.blind === "Yes" ? true : false,
        deaf: values.deaf === "Yes" ? true : false,
        widow: values.widow === "Yes" ? true : false,
        orphan: values.orphan === "Yes" ? true : false,
        userId: localStorage.getItem("userid"),
        enrollmentDate: new Date(),
      }

      // const educationData = {
      //   certificate: values.certificate,
      //   year: values.year,
      //   // grade: values.grade,
      //   degree: values.degree,
      //   school: values.school,
      // }

      console.log(data);
      addStudent(data);

      resetForm();
      handleNext();

    },
  });

  //edcation form
  const eduvalidate = Yup.object({
    // certificate: Yup.string().required("required"),
    year: Yup.string().required("required"),
    // grade: Yup.string().required("required"),
    // degree: Yup.string().required("required"),
    school: Yup.string().required("required"),
    degreeId: Yup.string().required("required"),
  });

  const eduformik = useFormik({
    initialValues: {
      // certificate: "",
      year: "",
      degreeId: "",
      school: "",
    },
    validationSchema: eduvalidate,
    onSubmit: (values, { resetForm }) => {

      setEdu([...edu, {
        // certificateDegree: values.certificate,
        year: values.year,
        degreeId: values.degreeId,
        schoolCollageUni: values.school,
      }]);

      const data = {
        year: values.year,
        degreeId: values.degreeId,
        schoolCollageUni: values.school,
        studentId: parseInt(localStorage.getItem("studentid")),
      }

      console.log(data);

      addEducation(data);
      // getEducationById(data.degreeId);
      resetForm();
    },
  });

  //Experinece form
  const expvalidate = Yup.object({
    companyName: Yup.string().required("required"),
    designation: Yup.string().required("required"),
    workFrom: Yup.string().required("required"),
    workTo: Yup.string().required("required"),
    // isPresent: Yup.string().required("required"),
  })

  const expformik = useFormik({
    initialValues: {
      companyName: "",
      designation: "",
      workFrom: "",
      workTo: "",
      isPresent: false,
    },
    validationSchema: expvalidate,
    onSubmit: (values, { resetForm }) => {
      setexp([...exp, values]);

      const data = {
        companyName: values.companyName,
        designationId: values.designation,
        workFrom: values.workFrom,
        workTo: values.isPresent === true ? "" : values.workTo,
        isPresent: values.isPresent === true ? "Yes" : "No",
        studentId: parseInt(localStorage.getItem("studentid")),
      }

      console.log(data);
      addExperience(data);

      resetForm();
    }

  })

  //course info
  const crsvalidate = Yup.object({
    institute: Yup.string().required("required"),
    city: Yup.string().required("required"),
    course: Yup.string().required("required"),
  })

  const crsformik = useFormik({
    initialValues: {
      institute: "",
      city: "",
      course: "",
    },
    validationSchema: crsvalidate,
    onSubmit: (values, { resetForm }) => {
      setcrs([...crs, values]);

      const data = {
        instituteId: parseInt(values.institute),
        cityId: parseInt(values.city),
        courseId: parseInt(values.course),
        studentId: parseInt(localStorage.getItem("studentid")),
      }

      console.log(data);
      addStudentInfo(data);

      resetForm();
    }

  })


  //axios post student request
  const addStudent = (data) => {
    axios.post(`${api.apiBaseUrl}/Student/Add `, data)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("studentid", res.data.id);
        // Add Image 
        axios.post(`${api.apiBaseUrl}/Student/AddImage `, {
          id:res.data.id,
          image : photo,
          ext : photoExt
        })

      })
      .catch(err => {
        console.log(err);
      })
  }


  const addEducation = (data) => {
    axios.post(`${api.apiBaseUrl}/StudentEducation/Add`, data)
      .then(res => {
        console.log(res.data);
        setStudentEdu(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const addExperience = (data) => {
    axios.post(`${api.apiBaseUrl}/StudentExperience/Add`, data)
      .then(res => {
        console.log(res.data);
        setStudentExp(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  //add student information
  const addStudentInfo = (data) => {
    axios.post(`${api.apiBaseUrl}/StudentAdmissionDetail/Add`, data)
      .then(res => {
        console.log(res.data);
        setStudentInfo(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }


  //Delete education by id axios
  const handleEduDelete = (id) => {
    // const url = `${api.apiBaseUrl}​/StudentEducation/Remove?id=${id}`;
    axios.delete(`${api.apiBaseUrl}/StudentEducation/Remove?id=${id}`)
      .then(res => {
        console.log(res.data);
        setStudentEdu(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  //Delete experience by id axios
  const handleExpDelete = (id) => {
    axios.delete(`${api.apiBaseUrl}/StudentExperience/Remove?id=${id}`)
      .then(res => {
        console.log(res.data);
        setStudentExp(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  //Delete student info by id axios
  const handleInfoDelete = (id) => {
    axios.delete(`${api.apiBaseUrl}/StudentAdmissionDetail/Remove?id=${id}`)
      .then(res => {
        console.log(res.data);
        setStudentInfo(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }




  return (
    <>
      <AppNavbar />

      <div>
        <section className="get_in">
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>

          {allStepsCompleted() ?
            (
              <h2>All Steps Completed</h2>
            ) : (

              <React.Fragment>
                {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                <Typography sx={{ mt: 2, mb: 3 }}></Typography>
                {steps[activeStep] === "Registration" ? (
                  <>
                    <div>

                      {checkRegistration ? (
                        <form>
                          <div className="contact-form row">


                            <div className="form-field col-lg-6">
                              <input
                                name=" "
                                id="photo"
                                type="file"
                                className="input-text"
                                placeholder=""
                                onChange={e => handleFile(e)}
                              />
                              <label htmlFor="photo" className="label">
                                Photo
                              </label>
                              <span className="err">
                                  {photoErr}
                              </span>
                            </div>

                            <div className="form-field col-lg-6">
                              <input
                                name=" "
                                id="CNIC"
                                type="text"
                                className="input-text"
                                placeholder=""
                                value={formik.values.CNIC}
                                onChange={formik.handleChange("CNIC")}
                                onBlur={formik.handleBlur("CNIC")}
                              />
                              <label htmlFor="CNIC" className="label">
                                CNIC
                              </label>
                              <span className="err">
                                {formik.touched.CNIC && formik.errors.CNIC}
                              </span>
                            </div>

                            <div className="form-field col-lg-6">
                              <select
                                id="inputState"
                                className="input-text"
                                value={formik.values.gender}
                                onChange={formik.handleChange("gender")}
                                onBlur={formik.handleBlur("gender")}
                              >
                                <option>Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                              </select>
                              <span className="err">
                                {formik.touched.gender && formik.errors.gender}
                              </span>
                            </div>
                            <div className="form-field col-lg-6">
                              <input
                                name=" "
                                id="Company"
                                type="text"
                                className="input-text"
                                value={formik.values.fatherName}
                                onChange={formik.handleChange("fatherName")}
                                onBlur={formik.handleBlur("fatherName")}
                              />
                              <label htmlFor="Company" className="label">
                                Father's Name
                              </label>
                              <span className="err">
                                {formik.touched.fatherName && formik.errors.fatherName}
                              </span>
                            </div>
                            <div className="form-field col-lg-6">
                              <input
                                name=" "
                                id="Contact"
                                type="number"
                                className="input-text"
                                value={formik.values.monthlyIncome}
                                onChange={formik.handleChange("monthlyIncome")}
                                onBlur={formik.handleBlur("monthlyIncome")}
                              />
                              <label htmlFor="Contact" className="label">
                                {" "}
                                Father Monthly Income
                              </label>
                              <span className="err">
                                {formik.touched.monthlyIncome && formik.errors.monthlyIncome}
                              </span>
                            </div>

                            <div className="form-field col-lg-6">
                              <input
                                name=" "
                                id="Massage"
                                type="text"
                                className="input-text"
                                value={formik.values.fatherOccupation}
                                onChange={formik.handleChange("fatherOccupation")}
                                onBlur={formik.handleBlur("fatherOccupation")}
                              />
                              <label htmlFor="Massage" className="label">
                                {" "}
                                Father Occupation
                              </label>
                              <span className="err">
                                {formik.touched.fatherOccupation &&
                                  formik.errors.fatherOccupation}
                              </span>
                            </div>
                            <div className="form-field col-lg-4">
                              <span>Mobile No</span>
                              <input
                                name=" "
                                id="Massage"
                                type="text"
                                className="input-text "
                                placeholder=""
                                value={formik.values.mobileNumber}
                                onChange={formik.handleChange("mobileNumber")}
                                onBlur={formik.handleBlur("mobileNumber")}
                              />

                              <span className="err">
                                {formik.touched.mobileNumber && formik.errors.mobileNumber}
                              </span>
                            </div>
                            <div className="form-field col-lg-4">
                              <span>Date Of Birth</span>
                              <input
                                name=" "
                                id="Massage"
                                type="date"
                                className="input-text"
                                value={formik.values.dob}
                                onChange={formik.handleChange("dob")}
                                onBlur={formik.handleBlur("dob")}
                              />

                              <span className="err">
                                {formik.touched.dob && formik.errors.dob}
                              </span>
                            </div>

                            <div className="form-field col-lg-4">
                              <input
                                name=" "
                                id="MassageAverage"
                                type="text"
                                className="input-text "
                                placeholder=""
                                value={formik.values.avgMonthlyHouseHoldIncome}
                                onChange={formik.handleChange("avgMonthlyHouseHoldIncome")}
                                onBlur={formik.handleBlur("avgMonthlyHouseHoldIncome")}
                              />
                              <label htmlFor="MassageAverage" className="label">
                                {" "}
                                Average Monthly Household Income
                              </label>
                              <span className="err">
                                {formik.touched.avgMonthlyHouseHoldIncome && formik.errors.avgMonthlyHouseHoldIncome}
                              </span>
                            </div>

                            <div className="form-field col-lg-4">
                              {/* select dropdown of district */}
                              <select
                                name="district"
                                className="input-text"
                                onChange={formik.handleChange("district")}
                                value={formik.values.district}
                                placeholder="District"
                                onBlur={formik.handleBlur("district")}
                              >
                                <option >Select District</option>
                                {
                                  district.map((d, i) => (
                                    <option key={i} value={d.id} >
                                      {d.name}
                                    </option>
                                  ))
                                }
                              </select>
                            </div>
                            {/* <div className="form-field col-lg-4">
                            <input
                              name=" "
                              id="Massage"
                              type="email"
                              className="input-text"
                              value={formik.values.email}
                              onChange={formik.handleChange("email")}
                              onBlur={formik.handleBlur("email")}
                            />
                            <label htmlFor="Massage" className="label">
                              {" "}
                              E-mail
                            </label>
                            <span className="err">
                              {formik.touched.email && formik.errors.email}
                            </span>
                          </div> */}

                            <div className="form-field col-lg-12">
                              <input
                                name=" "
                                id="Massage"
                                type="text"
                                className="input-text"
                                value={formik.values.presentaddress}
                                onChange={formik.handleChange("presentaddress")}
                                onBlur={formik.handleBlur("presentaddress")}
                              />
                              <label htmlFor="Massage" className="label">
                                Present Address{" "}
                              </label>
                              <span className="err">
                                {formik.touched.presentaddress && formik.errors.presentaddress}
                              </span>
                            </div>
                          </div>

                          <div className="row my-4">
                            <div className="col-6 my-3">
                              {/* Soprts Person Yes or Not */}
                              <div className="form-field col-lg-12">
                                <label htmlFor="Massage" className="label my-3 fs-5">
                                  {" "}
                                  Is there a sports person in your family?
                                </label>
                                <div className="form-field col-lg-6 d-flex justify-content-between">
                                  <div>
                                    <input
                                      name="sports"
                                      id="sportsYes"
                                      type="radio"
                                      className="input-text"
                                      value="Yes"
                                      onChange={formik.handleChange("sportsPerson")}
                                      onBlur={formik.handleBlur("sportsPerson")}
                                    />
                                    <label htmlFor="sportsYes" className="label fs-5">
                                      Yes
                                    </label>
                                  </div>
                                  <div>
                                    <input
                                      name="sports"
                                      id="sportsNo"
                                      type="radio"
                                      className="input-text"
                                      value="No"
                                      onChange={formik.handleChange("sportsPerson")}
                                      onBlur={formik.handleBlur("sportsPerson")}
                                    />
                                    <label htmlFor="sportsNo" className="label fs-5">
                                      No
                                    </label>
                                  </div>


                                </div>
                              </div>
                            </div>
                            <div className="col-6 my-3">
                              {/* Hafiz Quran Details */}
                              <div className="form-field col-lg-12">
                                <label htmlFor="Massage" className="label my-3 fs-5">
                                  {" "}
                                  Are you Hafiz-e-Quran?
                                </label>

                                <div className="form-field col-lg-6 d-flex justify-content-between">
                                  <div>
                                    <input
                                      name="hafiz"
                                      id="hafizYes"
                                      type="radio"
                                      className="input-text"
                                      value="Yes"
                                      onChange={formik.handleChange("hafiz")}
                                      onBlur={formik.handleBlur("hafiz")}
                                    />
                                    <label htmlFor="hafizYes" className="label fs-5">
                                      Yes
                                    </label>


                                  </div>
                                  <div>
                                    <input
                                      name="hafiz"
                                      id="hafizNo"
                                      type="radio"
                                      className="input-text"
                                      value="Yes"
                                      onChange={formik.handleChange("hafiz")}
                                      onBlur={formik.handleBlur("hafiz")}
                                    />
                                    <label htmlFor="hafizNo" className="label fs-5">
                                      No
                                    </label>


                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-6 my-3">
                              {/* Disablity Details */}
                              <div className="form-field col-lg-12">
                                <label htmlFor="Massage" className="label my-3 fs-5">
                                  {" "}
                                  Are you a person with disability?
                                </label>

                                <div className="form-field col-lg-6 d-flex justify-content-between">
                                  <div>
                                    <input
                                      name="disable"
                                      id="disablityYes"
                                      type="radio"
                                      className="input-text"
                                      value="Yes"
                                      onChange={formik.handleChange("disablity")}
                                      onBlur={formik.handleBlur("disablity")}
                                    />
                                    <label htmlFor="disablityYes" className="label fs-5">
                                      Yes
                                    </label>


                                  </div>
                                  <div>
                                    <input
                                      name="disable"
                                      id="disablityNo"
                                      type="radio"
                                      className="input-text"
                                      value="No"
                                      onChange={formik.handleChange("disablity")}
                                      onBlur={formik.handleBlur("disablity")}
                                    />
                                    <label htmlFor="disablityNo" className="label fs-5">
                                      No
                                    </label>


                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-6 my-3">
                              {/* Dumb Details */}
                              <div className="form-field col-lg-12">
                                <label htmlFor="Massage" className="label my-3 fs-5">
                                  {" "}
                                  Are you a person with Dumbness?
                                </label>

                                <div className="form-field col-lg-6 d-flex justify-content-between">
                                  <div>
                                    <input
                                      name="dumb"
                                      id="dumbYes"
                                      type="radio"
                                      className="input-text"
                                      value="Yes"
                                      onChange={formik.handleChange("dumb")}
                                      onBlur={formik.handleBlur("dumb")}
                                    />
                                    <label htmlFor="dumbYes" className="label fs-5">
                                      Yes
                                    </label>


                                  </div>
                                  <div>
                                    <input
                                      name="dumb"
                                      id="dumbNo"
                                      type="radio"
                                      className="input-text"
                                      value="No"
                                      onChange={formik.handleChange("dumb")}
                                      onBlur={formik.handleBlur("dumb")}
                                    />
                                    <label htmlFor="dumbNo" className="label fs-5">
                                      No
                                    </label>


                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-6 my-3">
                              {/* Physical Disablity Details */}
                              <div className="form-field col-lg-12">
                                <label htmlFor="Massage" className="label my-3 fs-5">
                                  {" "}
                                  Are you a person with Physical Disablity?
                                </label>

                                <div className="form-field col-lg-6 d-flex justify-content-between">
                                  <div>
                                    <input
                                      name="physical"
                                      id="fdYes"
                                      type="radio"
                                      className="input-text"
                                      value="Yes"
                                      onChange={formik.handleChange("physicalDisablity")}
                                      onBlur={formik.handleBlur("physicalDisablity")}
                                    />
                                    <label htmlFor="fdYes" className="label fs-5">
                                      Yes
                                    </label>
                                  </div>
                                  <div>
                                    <input
                                      name="physical"
                                      id="fdNo"
                                      type="radio"
                                      className="input-text"
                                      value="No"
                                      onChange={formik.handleChange("physicalDisablity")}
                                      onBlur={formik.handleBlur("physicalDisablity")}
                                    />
                                    <label htmlFor="fdNo" className="label fs-5">
                                      No
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-6 my-3">
                              {/* Blind Details */}
                              <div className="form-field col-lg-12">
                                <label htmlFor="Massage" className="label my-3 fs-5">
                                  {" "}
                                  Are you a person with Blindness?
                                </label>

                                <div className="form-field col-lg-6 d-flex justify-content-between">
                                  <div>
                                    <input
                                      name="blind"
                                      id="blindYes"
                                      type="radio"
                                      className="input-text"
                                      value="Yes"
                                      onChange={formik.handleChange("blind")}
                                      onBlur={formik.handleBlur("blind")}
                                    />
                                    <label htmlFor="blindYes" className="label fs-5">
                                      Yes
                                    </label>


                                  </div>
                                  <div>
                                    <input
                                      name="blind"
                                      id="blindNo"
                                      type="radio"
                                      className="input-text"
                                      value="No"
                                      onChange={formik.handleChange("blind")}
                                      onBlur={formik.handleBlur("blind")}
                                    />
                                    <label htmlFor="blindNo" className="label fs-5">
                                      No
                                    </label>


                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-6 my-3">
                              {/* Deaf Details */}
                              <div className="form-field col-lg-12">
                                <label htmlFor="Massage" className="label my-3 fs-5">
                                  {" "}
                                  Are you a person with Deafness?
                                </label>

                                <div className="form-field col-lg-6 d-flex justify-content-between">
                                  <div>
                                    <input
                                      name="deaf"
                                      id="deafYes"
                                      type="radio"
                                      className="input-text"
                                      value="Yes"
                                      onChange={formik.handleChange("deaf")}
                                      onBlur={formik.handleBlur("deaf")}
                                    />
                                    <label htmlFor="deafYes" className="label fs-5">
                                      Yes
                                    </label>
                                  </div>
                                  <div>
                                    <input
                                      name="deaf"
                                      id="deafNo"
                                      type="radio"
                                      className="input-text"
                                      value="No"
                                      onChange={formik.handleChange("deaf")}
                                      onBlur={formik.handleBlur("deaf")}
                                    />
                                    <label htmlFor="deafNo" className="label fs-5">
                                      No
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-6 my-3">
                              {/* Widow Details */}
                              <div className="form-field col-lg-12">
                                <label htmlFor="Massage" className="label my-3 fs-5">
                                  {" "}
                                  Are you a person with Widowness?
                                </label>

                                <div className="form-field col-lg-6 d-flex justify-content-between">
                                  <div>
                                    <input
                                      name="widow"
                                      id="widowYes"
                                      type="radio"
                                      className="input-text"
                                      value="Yes"
                                      onChange={formik.handleChange("widow")}
                                      onBlur={formik.handleBlur("widow")}
                                    />
                                    <label htmlFor="widowYes" className="label fs-5">
                                      Yes
                                    </label>
                                  </div>
                                  <div>
                                    <input
                                      name="widow"
                                      id="widowNo"
                                      type="radio"
                                      className="input-text"
                                      value="No"
                                      onChange={formik.handleChange("widow")}
                                      onBlur={formik.handleBlur("widow")}
                                    />
                                    <label htmlFor="widowNo" className="label fs-5">
                                      No
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-6 my-3">
                              {/* Orphan Details */}
                              <div className="form-field col-lg-12">
                                <label htmlFor="Massage" className="label my-3 fs-5">
                                  {" "}
                                  Are you a person with Orphanage?
                                </label>

                                <div className="form-field col-lg-6 d-flex justify-content-between">
                                  <div>
                                    <input
                                      name="orphan"
                                      id="orphanYes"
                                      type="radio"
                                      className="input-text"
                                      value="Yes"
                                      onChange={formik.handleChange("orphan")}
                                      onBlur={formik.handleBlur("orphan")}
                                    />
                                    <label htmlFor="orphanYes" className="label fs-5">
                                      Yes
                                    </label>
                                  </div>
                                  <div>
                                    <input
                                      name="orphan"
                                      id="orphanNo"
                                      type="radio"
                                      className="input-text"
                                      value="No"
                                      onChange={formik.handleChange("orphan")}
                                      onBlur={formik.handleBlur("orphan")}
                                    />
                                    <label htmlFor="orphanNo" className="label fs-5">
                                      No
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* <button className="btn btn-add" type="button"  onClick={formik.handleSubmit}>Submit</button>  */}
                            <Button variant="contained" onClick={formik.handleSubmit} className="mt-3" >Submit</Button>
                            {/* Row Closing */}
                          </div>
                        </form>) : (<div className="col-lg-12">
                          Already Registered
                        </div>
                      )}
                    </div>
                  </>
                ) : steps[activeStep] === "Education" ? (
                  <>
                    <form>
                      <div className="row mt-3">
                        <h3>Educational Backgroud</h3>

                        <div className="col-lg-12 mt-2">
                          <table className="table">
                            <thead className="thead ">
                              <tr>
                                <th scope="col">No.</th>
                                {/* <th scope="col">Certificate</th> */}
                                <th scope="col">Year</th>
                                {/* <th scope="col">Grade</th> */}
                                <th scope="col">Last Education Institute Name</th>
                                <th scope="col">Education Level</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {studentEdu.map((e, i) => (
                                <>
                                  <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    {/* <td>{e.certificateDegree}</td> */}
                                    <td>{e.year}</td>
                                    <td>{e.schoolCollageUni}</td>
                                    <td>{e.degrees}</td>
                                    <td>
                                      <IconButton onClick={() => handleEduDelete(e.id)}>
                                        <DeleteIcon />
                                      </IconButton>
                                    </td>
                                  </tr>
                                </>
                              ))}
                              <tr>
                                <th></th>
                                <td>
                                  <input
                                    name="year"
                                    id="Massage"
                                    type="text"
                                    className="input-text"
                                    onChange={eduformik.handleChange("year")}
                                    value={eduformik.values.year}
                                    placeholder="Year"
                                    onBlur={eduformik.handleBlur("year")}
                                  />
                                  <p className="err">
                                    {eduformik.touched.year && eduformik.errors.year}
                                  </p>
                                </td>
                                {/* <td>
                      <input
                        name="grade"
                        id="Massage"
                        type="text"
                        className="input-text"
                        onChange={eduformik.handleChange("grade")}
                        value={eduformik.values.grade}
                        placeholder="Grade"
                        onBlur={eduformik.handleBlur("grade")}
                      />
                      <p className="err">
                        {eduformik.touched.grade && eduformik.errors.grade}
                      </p>
                    </td> */}

                                <td>
                                  <input
                                    name="school"
                                    id="Massage"
                                    type="text"
                                    className="input-text"
                                    onChange={eduformik.handleChange("school")}
                                    value={eduformik.values.school}
                                    placeholder="Last Education Institute Name"
                                    onBlur={eduformik.handleBlur("school")}
                                  />
                                  <p className="err">
                                    {eduformik.touched.school && eduformik.errors.school}
                                  </p>
                                </td>
                                <td>

                                  {/* Select dropdown of degrees */}
                                  <select
                                    name="degreeId"
                                    id="Massage"
                                    className="input-text"
                                    onChange={eduformik.handleChange("degreeId")}
                                    value={eduformik.values.degreeId}
                                    placeholder="Degree"
                                    onBlur={eduformik.handleBlur("degreeId")}
                                  >
                                    <option >Select Education Level</option>
                                    {
                                      degrees.map((d, i) => (
                                        <option key={i} value={d.id} >
                                          {d.name}
                                        </option>
                                      ))
                                    }
                                  </select>
                                  <p className="err">
                                    {eduformik.touched.degreeId && eduformik.errors.degreeId}
                                  </p>
                                </td>

                                <td>
                                  <button className="btn btn-e" type="button" onClick={eduformik.handleSubmit}><i className='bx bx-plus'></i></button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </form>
                  </>
                ) : steps[activeStep] === "Experience" ? (
                  <>
                    <form>
                      <div className="row mt-3">
                        <h3>Experiences</h3>

                        <div className="col-lg-12 mt-2">
                          <table className="table">
                            <thead className="thead ">
                              <tr>
                                <th scope="col">No</th>
                                <th scope="col">Company Name</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Work From</th>
                                <th scope="col">Work To</th>
                                <th scope="col">Is Present</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {studentExp.map((e, i) => (
                                <>
                                  <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{e.companyName}</td>
                                    <td>{e.designation}</td>
                                    <td>{e.workFrom}</td>
                                    <td>{e.workTo}</td>
                                    <td>{e.isPresent}</td>
                                    <td>
                                      <IconButton onClick={() => handleExpDelete(e.id)}>
                                        <DeleteIcon />
                                      </IconButton>
                                    </td>
                                  </tr>
                                </>
                              ))}

                              <tr>
                                <th></th>
                                <td>
                                  <input
                                    name="companyName"
                                    id="Massage"
                                    type="text"
                                    className="input-text"
                                    onChange={expformik.handleChange("companyName")}
                                    placeholder="companyName"
                                    onBlur={expformik.handleBlur("companyName")}
                                  />
                                  <p className="err">
                                    {expformik.touched.companyName && expformik.errors.companyName}
                                  </p>
                                </td>
                                <td>
                                  {/* Designation dropdown */}
                                  <select
                                    name="designation"
                                    id="Massage"
                                    className="input-text"
                                    onChange={expformik.handleChange("designation")}
                                    value={expformik.values.designation}
                                    placeholder="Designation"
                                    onBlur={expformik.handleBlur("designation")}
                                  >
                                    <option >Select Designation</option>
                                    {
                                      designations.map((d, i) => (
                                        <option key={i} value={d.id} >
                                          {d.name}
                                        </option>
                                      ))
                                    }
                                  </select>

                                  <p className="err">
                                    {expformik.touched.departname &&
                                      expformik.errors.departname}
                                  </p>
                                </td>
                                <td>
                                  <input
                                    name="workFrom"
                                    id="Massage"
                                    type="date"
                                    className="input-text"
                                    max={new Date().toISOString().split("T")[0]}
                                    onChange={expformik.handleChange("workFrom")}
                                    value={expformik.values.workFrom}
                                    placeholder="workFrom"
                                    onBlur={expformik.handleBlur("workFrom")}
                                  />
                                  <p className="err">
                                    {expformik.touched.workFrom && expformik.errors.workFrom}
                                  </p>
                                </td>
                                <td>
                                  <input
                                    name="workTo"
                                    id="Massage"
                                    type="date"
                                    disabled={expformik.values.isPresent ? true : false}
                                    min={expformik.values.workFrom}
                                    max={new Date()}
                                    className="input-text"
                                    onChange={expformik.handleChange("workTo")}
                                    value={expformik.values.workTo}
                                    placeholder="workTo"
                                    onBlur={expformik.handleBlur("workTo")}
                                  />
                                  <p className="err">
                                    {expformik.touched.workTo && expformik.errors.workTo}
                                  </p>
                                </td>
                                <td>
                                  <input
                                    name="isPresent"
                                    id="Massage"
                                    type="checkbox"
                                    className="input-text"
                                    onChange={expformik.handleChange("isPresent")}
                                    value={expformik.values.isPresent}
                                    placeholder="workTo"
                                    onBlur={expformik.handleBlur("isPresent")}
                                  />
                                  <p className="err">
                                    {expformik.touched.isPresent && expformik.errors.isPresent}
                                  </p>
                                </td>
                                <td>
                                  <button className="btn btn-e" onClick={expformik.handleSubmit}><i className='bx bx-plus'></i></button>
                                </td>

                              </tr>



                            </tbody>
                          </table>
                        </div>
                      </div>
                    </form>
                  </>
                ) : steps[activeStep] === "Course Information" ? (
                  <>
                    <form>
                      <div className="row mt-3">
                        <h3>Course Information & Admission</h3>

                        <div className="col-lg-12 mt-2">
                          <table className="table">
                            <thead className="thead ">
                              <tr>
                                <th scope="col">No</th>
                                <th scope="col">Institute</th>
                                <th scope="col">City</th>
                                <th scope="col">Course</th>
                                <th scope="col">Action</th>
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
                                      <td>
                                        <IconButton onClick={() => handleInfoDelete(e.id)}>
                                          <DeleteIcon />
                                        </IconButton>
                                      </td>
                                    </tr>
                                  </>
                                ))
                              }

                              <tr>
                                <th></th>
                                <td>
                                  {/* institutes select dropdown */}
                                  <select
                                    name="institute"
                                    id="Massage"
                                    className="input-text"
                                    onChange={crsformik.handleChange("institute")}
                                    value={crsformik.values.institute}
                                    placeholder="Institute"
                                    onBlur={crsformik.handleBlur("institute")}
                                  >
                                    <option >Select Institute</option>
                                    {
                                      institutes.map((e, i) => (
                                        <option key={i} value={e.id} >
                                          {e.name}
                                        </option>
                                      ))
                                    }
                                  </select>
                                  <p className="err">
                                    {crsformik.touched.prefernces &&
                                      crsformik.errors.prefernces}
                                  </p>
                                </td>
                                <td>
                                  {/* cities select dropdown */}
                                  <select
                                    name="city"
                                    id="Massage"
                                    className="input-text"
                                    onChange={crsformik.handleChange("city")}
                                    value={crsformik.values.city}
                                    onBlur={crsformik.handleBlur("city")}
                                  >
                                    <option >Select City</option>
                                    {
                                      cities.map((e, i) => (
                                        <option key={i} value={e.id} >
                                          {e.name}
                                        </option>
                                      ))
                                    }
                                  </select>

                                  <p className="err">
                                    {crsformik.touched.departname &&
                                      crsformik.errors.departname}
                                  </p>
                                </td>
                                <td>
                                  {/* courses select dropdown */}
                                  <select
                                    name="course"
                                    id="Massage"
                                    className="input-text"
                                    onChange={crsformik.handleChange("course")}
                                    value={crsformik.values.course}
                                    onBlur={crsformik.handleBlur("course")}
                                  >
                                    <option >Select Course</option>
                                    {
                                      courses.map((e, i) => (
                                        <option key={i} value={e.id} >
                                          {e.name}
                                        </option>
                                      ))
                                    }
                                  </select>

                                  <p className="err">
                                    {crsformik.touched.tradename &&
                                      crsformik.errors.tradename}
                                  </p>
                                </td>
                                <td>
                                  <button className="btn btn-e" onClick={crsformik.handleSubmit}><i className='bx bx-plus'></i></button>
                                </td>
                              </tr>


                            </tbody>
                          </table>
                        </div>
                      </div>
                    </form>
                  </>
                ) : null
                }
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  {/* <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button> */}
                  <Box sx={{ flex: '1 1 auto' }} />
                  {isLastStep() ? (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleComplete}
                      sx={{ mr: 1 }}
                    >
                      Go to Account
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mr: 1 }}
                    >
                      Next
                    </Button>
                  )}
                  {/* <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                  </Button> */}
                </Box>
              </React.Fragment>


            )}

        </section>
      </div>
      <Footer />
    </>
  );
};

export default Registration;
