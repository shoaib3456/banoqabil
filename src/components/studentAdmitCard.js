import React , {useEffect, useState} from 'react'
import './studentAdmitCard.css'
import profileImg from '../assets/img_avatar.png'
import { Button } from '@mui/material'
import ReactToPdf from "react-to-pdf";
import axios from 'axios'
import api from '../config'

const StudentAdmitCard = () => {
  const [student, setStudent] = useState({})
  const [user, setUser] = useState({})
  const ref = React.createRef();

  const GetByUserIdWithRelationShip = () => {
    axios.get(`${api.apiBaseUrl}/Student/GetByUserIdWithRelationShip?id=${localStorage.getItem('userid')}`, {
      headers: {
        'Authorization': `bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {        
        console.log(res.data.student);
        console.log(res.data.user);
        setStudent(res.data.student)
        setUser(res.data.user)
        localStorage.setItem('studentid', res.data.student.id);

      }).catch(err => {
        localStorage.removeItem('studentid');
        console.log(err);
      });
  }

  useEffect(()=>{
    GetByUserIdWithRelationShip();
  },[])

  return (
    <>
      <div className="admit-card-container" >
        <div className='admit-card' ref={ref}>
          <div className='admit-card-header'>
            <img src={profileImg} alt="profile" className='card-img' />
          </div>
          <div className="admit-card-body">
            <div className='card-name'>
              <h5>Name</h5>
              <p>{user.name}</p>
            </div>
            <div>
              <h5>Father Name</h5>
              <p>{student.fatherName}</p>
            </div>
            <div className='card-name'>
              <h5>CNIC</h5>
              <p>{student.cnic}</p>
            </div>
            <div>
              <h5>Mobile</h5>
              <p>{student.mobile}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 d-flex justify-content-center">
        <ReactToPdf targetRef={ref} x={50} y={50} filename="admit-card.pdf">
          {({ toPdf }) => (
            <Button onClick={toPdf} variant="contained" size="lg" block>
              Download Admit Card
            </Button>
          )}
        </ReactToPdf>
      </div>
    </>
  )
}

export default StudentAdmitCard