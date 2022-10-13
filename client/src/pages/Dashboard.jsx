import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import styled from "styled-components"
import DashBoard from "../components/DashBoard"
import { useDispatch, useSelector } from 'react-redux'
import { changePageStatus } from '../store/pageSlice'
import { changeToLogOut } from '../store/navBarSlice'

const Container = styled.div`
    
`

const Dashboard = () => {

    const dispatch = useDispatch()
    const loggedIn = useSelector((state)=>state.userState.loggedIn)
    const token = useSelector((state)=>state.token.token)
    const navigate = useNavigate()

    
    useEffect(()=>{
      if(!loggedIn || !token){
        navigate("/login")
      }else{
        dispatch(changePageStatus("dashboard"))
        dispatch(changeToLogOut())
      }
    },[loggedIn, dispatch, navigate, token])


  return (
    <Container>
      <DashBoard/>
    </Container>
  )
}

export default Dashboard
