import React,{useState,useContext} from 'react';
import {Button,Modal,InputGroup, FormControl} from 'react-bootstrap'
import axios from 'axios';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../../context/index'

interface ModalProps{
    text:String;
    variant: "primary" |"secondary" |"danger";
    isSignUpFlow: boolean;
}

const ErrorMessage = styled.p`
  color: red;
`

const ModalComp = ({text, variant, isSignUpFlow}:ModalProps) => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[error,setError]=useState("")
    const navigate = useNavigate();
    const [state,setState] = useContext(UserContext);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClick = async()=>{
      let data;
      if(isSignUpFlow){
       const {data:signUpData}= await  axios.post("http://localhost:8080/auth/signup",{
            email,password
        })
       data = signUpData
      }else{
        const {data:logInData}= await axios.post("http://localhost:8080/auth/login",{
            email,password
        })
        data=logInData
      }

      if(data.errors.length){
        return setError(data.errors[0].msg)
      }
      setState({
        data:{
          id:data.data.user.id,
          email:data.data.user.email
        },
        loading:false,
        error:null
      })
      localStorage.setItem('token',data.data.token)
      axios.defaults.headers.common["authorization"]=`Bearer ${data.data.token}`
      navigate('/articles')
    }
  
    return (
      <>
        <Button 
        onClick={handleShow} 
        variant={variant} 
        size="lg"
        style={{marginRight:"1rem", padding:'0.3rem 2rem'}}
        >
          {text}
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>{text}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className='mb-3'>
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </InputGroup>
            <InputGroup className='mb-3'>
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl type='password'  value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </InputGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Modal.Body>
          <Modal.Footer>
            
            <Button variant='secondary' onClick={handleClose}>Close</Button>
            <Button variant='primary' onClick={handleClick}>{text}</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ModalComp