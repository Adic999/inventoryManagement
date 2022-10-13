import React,{useEffect} from 'react'
import styled from 'styled-components'
import LoginComponent from '../components/LoginComponent'
import { useDispatch } from 'react-redux'
import { changePageStatus } from '../store/pageSlice'
import { changeToRegister } from '../store/navBarSlice'
import { changeToLoggedOut } from '../store/userSlice'


const Container = styled.div`
    
`

const Login = () => {
    
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(changePageStatus("login"))
        dispatch(changeToLoggedOut())
        dispatch(changeToRegister())
    },[dispatch])

  return (
    <Container>
      <LoginComponent/>
    </Container>
  )
}

export default Login
