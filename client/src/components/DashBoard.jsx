import React from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom'
const Container = styled.div`
    width: 100vw;
    height: 50vh;
    padding: 20px;
    margin-top: 20%;
`
const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`
const Option = styled.p`
    background-color: #16213E;
    color: white;
    height: 10vh;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 20px;
`

const DashBoard = () => {

  return (
    <Container>
        <Wrapper>
                <Link style={{textDecoration: "none"}} to="/shop">
                    <Option>SHOP</Option>
                </Link>
            <Link style={{textDecoration: "none"}} to="/dailysale"><Option>DAILY SALE</Option></Link>
        </Wrapper>
    </Container>
  )
}

export default DashBoard
