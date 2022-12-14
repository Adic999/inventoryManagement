import React,{useState} from 'react'
import styled from "styled-components"
import { loginUser } from '../functions/userfunctions'
import {changeToLoggedIn} from "../store/userSlice"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { registerToken } from "../store/tokenSlice";

const Container = styled.div`
    height: 50vh;
    padding: 20px;
`
const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`
const Title = styled.h1`
    font-weight: 500;
`
const Input = styled.input`
    height: 5vh;
    width: 80%;
    padding: 5px;
    margin-bottom: 20px;
`
const Button = styled.button`
    width: 50%;
    height: 5vh;
    background-color: green;
    color: white;
    font-weight: bold;
    font-size: 20px;
    border: none;
    cursor: pointer;
`
const Link = styled.a`
    color: #000000;
    cursor: pointer;
`

const Form = styled.form`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`


const LoginComponent = () => {

    const [inputVal, setInputVal] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleInput = (e)=>{
       setInputVal((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
       }))
    }
    const {email, password} = inputVal

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(email && password){
            const res = await loginUser(email, password)
            if(res.message === "No user found" || res.message === "incorrect password"){
                console.log(res.message)
            }else{
                dispatch(changeToLoggedIn())
                dispatch(registerToken(res.token))
                navigate("/")
            }
        }else{
            console.log("Please fill all the forms")
        }
    }

  return (
    <Container>
        <Wrapper>
            <Title>
                LOGIN
            </Title>
            <Form onSubmit={handleSubmit}>
            <Input type="text" name='email' placeholder='email' onChange={handleInput} value={email || ''}/>
            <Input type="password" name="password" placeholder='password' onChange={handleInput} value={password || ''}/>
            <Button type='submit'>Login</Button>
            </Form>
            <Link>Forgot password ?</Link>
        </Wrapper>
    </Container>
  )
}

export default LoginComponent
