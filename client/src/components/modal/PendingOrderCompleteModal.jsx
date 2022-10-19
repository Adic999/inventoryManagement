import React from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector } from 'react-redux'
import { completePendingOrder } from '../../functions/dailySaleFunction'
import { setPendingOrderReRender } from '../../store/takeOrder'
import {isLoading, sendAlert} from "../../store/alert"
const Container = styled.div`
    background-color: hsla(0, 0%, 98.0392156862745%, 1);
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    height: 40vh;
    width: 100%;

`
const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    z-index: 100;
`
const Title = styled.h1`
    
`
const Paragraph = styled.p`
    font-size: medium;
`
const ButtonContainer = styled.div`
    width: 100%;
    height: 5vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Button = styled.button`
    border: none;
    background-color: ${props => props.color};
    font-size: large;
    height: 100%;
    padding: 5px;
    width: 49%;
    font-weight: bold;
    cursor: pointer;
`

const PendingOrderCompleteModal = ({setCompleteOpen, id, }) => {

  // local storage values
  const token = useSelector(state=>state.token.token)
  const pendingOrderReRender = useSelector(state=>state.takeOrder.pendingOrderReRender)
  const dispatch = useDispatch()

  const handleComplete = async ()=>{
    dispatch(isLoading(true))
    try {
      await completePendingOrder(token,id)
      dispatch(setPendingOrderReRender(pendingOrderReRender ? false:true))
      dispatch(sendAlert("orderCompleted"))
    } catch (error) {
      dispatch(sendAlert("generalAlert"))
    }
    dispatch(isLoading(false))
    setCompleteOpen(false)
    setTimeout(() => {
      dispatch(sendAlert("off"))
    }, 1000);
  }
  
  const handleCancel = ()=>{
    setCompleteOpen(false)
  }
  return (
    <Container>
      <Wrapper>
        <Title>ARE YOU SURE ?</Title>
        <Paragraph>Once order gets completed it cannot be undone.</Paragraph>
        <ButtonContainer>
        <Button onClick={handleComplete} color='green'>Complete</Button>
        <Button onClick={handleCancel} color='orange'>CANCEL</Button>
        </ButtonContainer>
      </Wrapper>
    </Container>
  )
}

export default PendingOrderCompleteModal
