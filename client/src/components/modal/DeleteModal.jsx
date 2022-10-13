import React from 'react'
import styled from 'styled-components'
import { turnOff } from '../../store/fncButtons'
import { useDispatch, useSelector } from 'react-redux'
import { resetTempData } from '../../store/tempData'
import {deleteShopItem} from "../../functions/shopFunction"

const Container = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(250, 250, 250, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
`
const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
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
 
const DeleteModal = ({userItems,setUserItems}) => {
    const dispatch = useDispatch()
    const id = useSelector(state=> state.tempData.tempData.id)
    const token = useSelector(state=> state.token.token)

    const handleDelete = async ()=>{
      const deleted = await deleteShopItem(token, id)
      if(deleted !== "NO ITEM FOUND"){
        setUserItems([
          ...userItems,
          "deleted"
        ])
      dispatch(turnOff("delete"))
    }else{
      console.log(deleted)
      dispatch(turnOff("delete"))
    }
    }

    const handleCancel = ()=>{
        dispatch(turnOff("delete"))
        dispatch(resetTempData())
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

export default DeleteModal
