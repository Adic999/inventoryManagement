import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(auto, fit-content);
    padding: 5px;
    border: 1px solid black;
    margin-bottom: 10px;
    background-color: #96b071;
`
const RowContainer = styled.div`
    border: 1px solid black;
    height: 5vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:nth-of-type(odd){
        background-color: #5A5A5A;
        color: white;
    }
`
const Label = styled.label`
    flex: 1;
    text-align: end;
    padding: 0px 10px;
    font-size: 20px;
`

const Value = styled.p`
    flex: 2;
    text-align: start;
    padding: 0px 10px;
    font-size: 20px;
`



const RenderSales = ({id, date,name, curry1, curry2, amount, spiceLevel, drink, complementary}) => {
    
  return (
    <Container id={id}>
      <RowContainer>
        <Label>Name:</Label>
        <Value>{name}</Value>
      </RowContainer>
      {curry1 ? <RowContainer>
        <Label>Curry1:</Label>
        <Value>{curry1}</Value>
      </RowContainer>:null}
      {curry2 ? <RowContainer>
        <Label>Curry2:</Label>
        <Value>{curry2}</Value>
      </RowContainer>:null}
      <RowContainer>
        <Label>Amount:</Label>
        <Value>{amount}</Value>
      </RowContainer>
      {spiceLevel? <RowContainer>
        <Label>SpiceLevel:</Label>
        <Value>{spiceLevel}</Value>
      </RowContainer>:null}
      {drink? <RowContainer>
        <Label>Drink:</Label>
        <Value>{drink}</Value>
      </RowContainer>:null}
      {complementary? <RowContainer>
        <Label>Complementary:</Label>
        <Value>{complementary}</Value>
      </RowContainer>:null}
      <RowContainer>
        <Label>Date:</Label>
        <Value>{date}</Value>
      </RowContainer>
    </Container>
  )
}

export default RenderSales
