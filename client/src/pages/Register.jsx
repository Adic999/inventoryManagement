import React,{useEffect} from 'react'
import styled from 'styled-components'
import RegisterComponent from '../components/RegisterComponent'
import { useDispatch } from 'react-redux'
import { changePageStatus } from '../store/pageSlice'
import { changeToLogIn } from '../store/navBarSlice'

const Container = styled.div`
    
`

const Register = () => {
    
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(changePageStatus("register"))
        dispatch(changeToLogIn())
    },[dispatch])

  return (
    <Container>
      <RegisterComponent/>
    </Container>
  )
}

export default Register
