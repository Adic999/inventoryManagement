import React from 'react'
import styled from "styled-components"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

const Container = styled.div`
    height: 5vh;
    margin-bottom:5px;
`
const Wrapper = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  background-color: #0F3460;
  color: white;
  justify-content: space-between;
`
const Title = styled.h1`
    width: 80%;
`
const Button = styled.button`
  background:none;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PageTitleBar = () => {
  const loggedIn = useSelector((state)=>state.userState.loggedIn)
  const pageStatus = useSelector((state)=>state.pageState.pageStatus)
  const navigate = useNavigate()
  let pageTitle

  switch(pageStatus){
    case "login":
      pageTitle = "Login"
      break
    case "register":
      pageTitle = "Register"
      break
    case "dashboard":
      pageTitle = "DASHBOARD"
      break
    case "shop":
      pageTitle = "SHOP"
      break
    case "daily sale":
      pageTitle = "DAILY SALE"
      break
    case "take order":
      pageTitle = "TAKE ORDER"
      break
    case "see sale":
      pageTitle = "SALE"
      break
    case "create item":
      pageTitle = "CREATE ITEM"
      break
    case "lunch":
      pageTitle = "LUNCH"
      break
    case "dinner":
      pageTitle = "DINNER"
      break
    case "pending orders":
      pageTitle = "ORDERS"
      break
    default:
      pageTitle = "DASHBOARD"
  }

  const handleBackButton= ()=>{
   if(pageTitle === "SHOP"||pageTitle=== "DAILY SALE"){
    navigate("/")
   }else if(pageTitle === "TAKE ORDER" || pageTitle === "SALE" || pageTitle === "CREATE ITEM"){
    navigate("/dailySale")
   }else if(pageTitle === "LUNCH" || pageTitle === "DINNER"){
    navigate("/takeOrder")
   }else if(pageTitle === "ORDERS"){
    navigate(-1)
   }
  }
  return (
    <Container>
      <Wrapper>
      {pageTitle !== "DASHBOARD"?<Button onClick={handleBackButton}>{loggedIn ?<ArrowBackOutlinedIcon style={{cursor:"pointer"}}/>:null}</Button>:null}
        <Title>
          {pageTitle}
        </Title>
      </Wrapper>
    </Container>
  )
}

export default PageTitleBar
