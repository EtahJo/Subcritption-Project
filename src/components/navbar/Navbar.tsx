import React,{useContext} from 'react';
import {Navbar,NavItem, NavLink} from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
import styled from 'styled-components';

const LeftNavContainer = styled.div`
margin-left: auto;
`

const Nav = () => {
  const[state,setState ]= useContext(UserContext);
  const navigate = useNavigate()
  const handleLogout=()=>{
    setState({data:null,loading:false,error:null})
    localStorage.removeItem("token")
    navigate("/")
  }
  console.log(state)
  return (
   <Navbar>
    <NavItem>  
          <Link to='/' className="nav-link"> Home</Link>
    </NavItem>
    {
      state.data && (
        <LeftNavContainer onClick={handleLogout}>
            <NavItem>  
        <NavLink> Logout</NavLink>
         </NavItem>
        </LeftNavContainer>
      
      )
    }
   </Navbar>
  )
}

export default Nav