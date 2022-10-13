import React from 'react'
import styled from "styled-components"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Container = styled.div`
`

const Wrapper = styled.div`
    height: 5vh;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding:0px 20;
    background-color: #16213E;
    color: white;
`
const Logo = styled.h1`
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`

const LinkContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    cursor: pointer;
`

const Navbar = () => {
    const linkStatus = useSelector((state)=>state.navBarLinkState.linkstate)
  return (
    <Container>
        <Wrapper>
            <Logo>Inventory</Logo>
            <LinkContainer>
            {linkStatus === "register" ? <PersonOutlineOutlinedIcon/> : linkStatus === "login" ? <LoginOutlinedIcon/>:linkStatus === "logout"?<LogoutOutlinedIcon/>:null}
            <Link to={linkStatus} style={{textDecoration: "none", color: "white"}}>
            {linkStatus === "register" ? "Register" : linkStatus === "login" ? "Login":linkStatus === "logout"?"Logout":null}
            </Link>
            </LinkContainer>
        </Wrapper>
    </Container>
  )
}

export default Navbar
