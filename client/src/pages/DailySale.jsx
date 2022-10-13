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
    height: 80%;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    padding: 5%;
`
const Category = styled.p`
    border: 1px solid black;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: white;
    background-color: #0F3460;
`
const DailySale = () => {

    const navigate = useNavigate()
    const loggedIn = useSelector((state)=>state.userState.loggedIn)
    const token = useSelector((state)=>state.token.token)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!loggedIn || !token){
            navigate("/login")
            }else{
            dispatch(changePageStatus("daily sale"))
            }
    },[loggedIn, dispatch, token, navigate])
    return (
        <Container>
        <Wrapper>
            <Link style={{textDecoration: "none",width: "100%"}} to="/takeOrder">
                <Category>TAKE ORDER</Category>
            </Link>
            <Link style={{textDecoration: "none",width: "100%"}} to="/seeSale">
                <Category>SEE SALE</Category>
            </Link>
            <Link style={{textDecoration: "none",width: "100%"}} to="/createItem">
                <Category>CREATE ITEM</Category>
            </Link>
        </Wrapper>
        </Container>
    )
}

export default DailySale
