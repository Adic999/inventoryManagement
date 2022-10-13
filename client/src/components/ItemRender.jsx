import React from 'react'
import styled from 'styled-components'
import {useDispatch} from "react-redux"
import { turnOn } from '../store/fncButtons'
import { updateTempData } from '../store/tempData'


const Item = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  height: max-content;
`
const ItemRowsContaier = styled.div`
  display: flex;
  flex-direction: column;
  max-height: fit-content;
  justify-content: space-between;
  padding: 1px;
`
const ItemRow = styled.div`
  border: 1px solid black;
  margin: 1px;
  padding: 1px;
  max-height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;

`
const DetailKey = styled.p`
  flex: 1;
  height: 100%;
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const DetailValue = styled.p`
  height: 100%;
  flex: 2;
  width: 79%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FunctionButtonsContainer = styled.div`
  background-color: lightcyan;
  margin-top: 2%;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:2px;
`
const Functionbutton = styled.button`
  background-color: ${props => props.color};
  width: 30%;
  height:100%;
  padding: 1px;
  font-weight: bold;
  font-size: 15px;
  border: none;
  cursor:pointer;
`

const ItemRender = ({id,name, amount, costPrice, sellPrice, seller, date}) => {

  const dispatch = useDispatch()

  const handleClick=(e)=>{
    dispatch(turnOn(e.target.name))
    const filterContainerNode = e.target.parentNode
    const item = filterContainerNode.parentNode
    const childrens= item.children[0]
   const rowchild = childrens.children
   const itemid = item.id
   const itemname = rowchild[0].children[1].innerText
   const itemamount = rowchild[1].children[1].innerText
   const itemcostPrice = rowchild[2].children[1].innerText
   const itemsellPrice = rowchild[3].children[1].innerText
   const itemseller = rowchild[4].children[1].innerText
   dispatch(updateTempData({itemid, itemname, itemamount, itemcostPrice, itemsellPrice, itemseller}))
}
  
  return (
    <>
  <Item id={id}>
      <ItemRowsContaier>
    <ItemRow>
      <DetailKey>NAME:</DetailKey>
      <DetailValue>{name}</DetailValue>
    </ItemRow>
    <ItemRow>
      <DetailKey>AMOUNT:</DetailKey>
      <DetailValue>{amount}</DetailValue>
    </ItemRow>
    <ItemRow>
      <DetailKey>COST PRICE:</DetailKey>
      <DetailValue>{costPrice}</DetailValue>
    </ItemRow>
    <ItemRow>
      <DetailKey>SELL PRICE:</DetailKey>
      <DetailValue>{sellPrice}</DetailValue>
    </ItemRow>
    <ItemRow>
      <DetailKey>SELLER:</DetailKey>
      <DetailValue>{seller}</DetailValue>
    </ItemRow>
    <ItemRow>
      <DetailKey>DATE:</DetailKey>
      <DetailValue>{date}</DetailValue>
    </ItemRow>
  </ItemRowsContaier>
  <FunctionButtonsContainer>
  <Functionbutton name='sold' onClick={handleClick} color={"green"}>
  SOLD
  </Functionbutton>
  <Functionbutton name='update' onClick={handleClick} color={"orange"}>
  UPDATE
  </Functionbutton>
  <Functionbutton name='delete' onClick={handleClick} color={"red"}>
  DELETE
  </Functionbutton>
  </FunctionButtonsContainer>
</Item>
    </>
  )
}
export default ItemRender
