import React from 'react'
import styled from 'styled-components'
import { turnOff } from '../../store/fncButtons'
import {useDispatch, useSelector} from "react-redux"
import { resetTempData } from '../../store/tempData'
import { updateShopItem, soldShopItem } from '../../functions/shopFunction'

const Container = styled.div`
    
`
const Wrapper = styled.div`
  height: 5vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1px;
`
const Button = styled.button`
    height: 100%;
    background-color: ${props => props.color};
    width: 49%;
    font-weight: bold;
    font-size: 20px;
    border: none;
    cursor: pointer;
`

const FuncBtnComoponent = ({button,list, token, userItems, setUserItems}) => {
    const dispatch = useDispatch()
    const id = useSelector(state=> state.tempData.tempData.id)

    const handleCancel = (e)=>{
        dispatch(turnOff(e.target.name))
        dispatch(resetTempData())
    }

    const handleClick = async (e)=>{
      e.preventDefault()
      if(button === "sold"){
        if(list.amount === ''){
          console.log("AMOUNT CANNOT BE EMPTY")
        }else{
          const sellItem = await soldShopItem(token,list,id)
          console.log(sellItem)
          setUserItems([
            ...userItems,
            "sellItem"
          ])
          dispatch(turnOff(e.target.name))
          dispatch(resetTempData())
        }
      }else{
        const listToSend = {}
        // filtering the empty values from the list
        Object.entries(list).forEach(entry=>{
          const [key, value] = entry
          if(value){
            listToSend[key]=value
          }
        })
        if(Object.keys(listToSend).length > 0){
          const updateItem = await updateShopItem(token, list, id)
          setUserItems([
            ...userItems,
            updateItem
          ])
        }else{
          console.log("CANNOT UPDATE EMPTY ARGUMENTS")
        }
        dispatch(turnOff(e.target.name))
        dispatch(resetTempData())
      }
    }

  return (
    <Container>
      <Wrapper>
        <Button onClick={handleClick} name={button}  color='green'>
            {button}
        </Button>
        <Button name={button} onClick={handleCancel} color='orange'>
            Cancel
        </Button>
      </Wrapper>
    </Container>
  )
}

export default FuncBtnComoponent
