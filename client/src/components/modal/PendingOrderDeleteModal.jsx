import React from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector } from 'react-redux'
import { deletePendingOrder } from '../../functions/dailySaleFunction'
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

const PendingOrderDeleteModal = ({setDeleteOpen,id }) => {

  // local storage values
  const token = useSelector(state=>state.token.token)
  const pendingOrderReRender = useSelector(state=>state.takeOrder.pendingOrderReRender)
  const dispatch = useDispatch()


  const handleDelete = async ()=>{
    dispatch(isLoading(true))
    try {
      await deletePendingOrder(token, id)
      dispatch(setPendingOrderReRender(pendingOrderReRender ? false:true))
      dispatch(sendAlert("orderDeleted"))
  } catch (error) {
    dispatch(sendAlert("generalAlert"))
  }
  dispatch(isLoading(false))
  setDeleteOpen(false)
  setTimeout(() => {
    dispatch(sendAlert("off"))
  }, 1000);
  }
  
  const handleCancel = ()=>{
    setDeleteOpen(false)
  }
  return (
    <Container>
      <Wrapper>
        <Title>ARE YOU SURE ?</Title>
        <Paragraph>Data cannot be recovered once deleted.</Paragraph>
        <ButtonContainer>
        <Button onClick={handleDelete} color='red'>DELETE</Button>
        <Button onClick={handleCancel} color='orange'>CANCEL</Button>
        </ButtonContainer>
      </Wrapper>
    </Container>
  )
}

export default PendingOrderDeleteModal
