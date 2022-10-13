import React, { useEffect } from 'react'
import styled from 'styled-components'
import {useNavigate, Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { changePageStatus } from '../store/pageSlice'

const Container = styled.div`
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    height: 50%;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    padding: 5%;
    background-color: #eeeeee;
`
const Option = styled.p`
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 50px;
  cursor: pointer;
  text-decoration: none;
  background-color: #0F3460;
`
const TakeOrder = () => {
  const navigate = useNavigate()
    const loggedIn = useSelector((state)=>state.userState.loggedIn)
    const token = useSelector((state)=>state.token.token)
    const dispatch = useDispatch()

  useEffect(()=>{
        if(!loggedIn || !token){
            navigate("/login")
            }else{
            dispatch(changePageStatus("take order"))
            }
    },[loggedIn, dispatch, token, navigate])

  return (
    <Container>
      <Wrapper>
        <Link to="/lunch" style={{textDecoration:"none", width: "100%"}}>
          <Option>LUNCH</Option>
        </Link>
        <Link to="/dinner" style={{textDecoration:"none", width: "100%"}}>
          <Option>DINNER</Option>
        </Link>
      </Wrapper>
    </Container>
  )
}

export default TakeOrder
