import React,{useState} from 'react'
import styled from "styled-components"
import { registerUser } from '../functions/userfunctions'
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { sendAlert,isLoading} from '../store/alert'

const Container = styled.div`
    height: 50vh;
    padding: 20px;
    margin-top: 10%;
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
    margin-bottom: 10px;
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
    margin-top: 10px;
`

const Form = styled.form`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`


const RegisterComponent = () => {

    const [inputVal, setInputVal] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleInput = (e)=>{
       setInputVal((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
       }))
    }
    const {name, email, password, password2} = inputVal

    const handleSubmit = async (e)=>{
        e.preventDefault()
        dispatch(isLoading(true))
        if(name && email && password && password2){
            if(password === password2){
                delete inputVal.password2
            const res = await registerUser(inputVal)
            if(res.message === "user already exitst" || res.message === "error occured while creating the user"){
                console.log(res.message)
                dispatch(sendAlert("alreadyExists"))
            }else{
                navigate("/login")
            }}else{
                dispatch(sendAlert("differentPasswords"))
                console.log("password do not match")
            }
        }else{
            dispatch(sendAlert("emptyFields"))
            console.log("Please fill all the forms")
        }
        dispatch(isLoading(false))
        setTimeout(() => {
            dispatch(sendAlert("off"))
        }, 1000);
    }

  return (
    <Container>
        <Wrapper>
            <Title>
                REGISTER
            </Title>
            <Form onSubmit={handleSubmit}>
            <Input type="text" onChange={handleInput} name="name" value={name || ''} placeholder='username'/>
            <Input type="email" onChange={handleInput} name="email" value={email || ''} placeholder='email'/>
            <Input type="password" onChange={handleInput} name="password" value={password || ''} placeholder='password'/>
            <Input type="password" onChange={handleInput} name="password2" value={password2 || ''} placeholder='confirm password'/>
            <Button>Register</Button>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default RegisterComponent
