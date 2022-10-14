import React,{useState} from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {setLunchReRender, setDinnerReRender , turnOffTakeOrder, turnOnTakeOrder} from "../store/takeOrder"
import { setTargetId } from '../store/takeOrder'
import { createPendingOrders } from '../functions/dailySaleFunction'
import { sendAlert } from '../store/alert'

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(5vh,fit-content);
  padding: 5px;
  border: 1px solid black;
  ${props=> !props.turnOn ? {minHeight:"10vh"}:null}
`
const ItemTitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(100%, fit-content);
  min-height: 5vh;
`
const ItemName = styled.h2`
  display: flex;
  align-items: center;
`
const TakeOrderBtn = styled.button`
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  background-color: green;
  color: white;
  height: 100%;
`
const ExpandContainer = styled.div`
  display: grid;
  border: 1px solid black;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(5vh, fit-content);
  padding: 5px;
  margin-top: 5%;
`
const ExpandRow = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 2fr;
  grid-auto-rows: minmax(5vh, fit-content); */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px;
  &:nth-of-type(even){
    background-color: #eeeeee;
  }
  background-color: ${props => props.color};
`
const Lablel = styled.p`
  width: 90%;
  padding: 5px;
  font-size: large;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const CounterContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const CounterButton = styled.button`
  border: 1px solid black;
  height: 100%;
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: x-large;
`
const Count = styled.p`
  height: 100%;
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: large;
`

const Select = styled.select`
  width: 100%;
  font-size: large;
  border: 1px solid black;

`
const Option = styled.option`

`
const Complementary = styled.div`
  width: 100%;
  display: flex;
  font-size: large;
  font-weight: bold;
  justify-content: flex-start;
  align-items: center;
`
const CurrySelectContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
`
const CurrySelect = styled.select`
  border: 1px solid black;
  width: 100%;
  font-size: large;
`
const CurryOption = styled.option`

`
// takeorder button on function buttons
const TakeOrderButtonOnContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const TakeOrderFunctionButton = styled.button`
    border: none;
    background-color: ${props=> props.color};
    color: white;
    font-weight: bold;
    font-size: 20px;
    height: 100%;
    width: 49%;
    cursor: pointer;
`

const TakeOrderItemRender = ({id,price,itemName,curryAmount,curryOptions,drinkOptions,complementary}) => {
    const [amountCount, setAmountCount] = useState(1)
    const [spiceCount, setSpiceCount] = useState(0)
    const dispatch = useDispatch()
    const turnOn = useSelector(state => state.takeOrder.takeOrder)
    const targetId = useSelector(state=> state.takeOrder.targetId)
    const token = useSelector(state=> state.token.token)
    const [curry1, setCurry1] = useState("")
    const [curry2, setCurry2] = useState("")
    const [drink, setDrink] = useState("")
    const lunchReRender = useSelector(state=> state.takeOrder.lunchReRender)
    const dinnerReRender = useSelector(state=> state.takeOrder.dinnerReRender)
    const page = useSelector(state=> state.pageState.pageStatus)


    // order amount counter
    const amountCounter = (e)=>{
      if(e.target.id==="minus"){
        if(amountCount >1)
        setAmountCount(amountCount-1)
      }
      if(e.target.id==="add"){
        setAmountCount(amountCount+1)
      }
    }

    // curry spice level counter
    const spiceCounter = (e)=>{
      if(e.target.id==="minus"){
        if(spiceCount >0)
        setSpiceCount(spiceCount-1)
      }
      if(e.target.id==="add"){
        if(spiceCount < 4){
        setSpiceCount(spiceCount+1)}
      }
    }

    // take order function
    const handleTakeOrder = (e)=>{
        dispatch(turnOnTakeOrder("takeOrder"))
        const parent = e.target.parentNode
        const rowParent = parent.parentNode.id
        dispatch(setTargetId(rowParent))
    }

    // take order Cancel button function
    const handleOrderCancel = ()=>{
        dispatch(turnOffTakeOrder("takeOrder"))
        dispatch(setTargetId(""))
        setAmountCount(1)
        setSpiceCount(0)
    }

    // handle curry select
    const handleSelect = (e)=>{
     if(e.target.name === "curry1"){
      setCurry1(e.target.value)
     }else if(e.target.name === "curry2"){
      setCurry2(e.target.value)
      
     }else if(e.target.name === "drink"){
      setDrink(e.target.value)
      
     }
    }

    const handleConfirm = async ()=>{
      try {
        if(complementary){
          const data = {
            id,
            name: itemName,
            curry1,
            curry2,
            price,
            amount: amountCount,
            spiceLevel: spiceCount,
            drink,
            complementary,
          }
          if(Object.keys(data).length=== 9){
            await createPendingOrders(token, data)
            if(page === "lunch"){
            dispatch(setLunchReRender(lunchReRender ? false: true))
          }else if(page === "dinner"){
            dispatch(setDinnerReRender( dinnerReRender? false: true))
          }
            dispatch(sendAlert("orderAdded"))
            setTimeout(() => {
              dispatch(sendAlert("off"))
            }, 1000);
          }
      }
        else{
          const complementary = ""
          const data = {
            id,
            name: itemName,
            curry1,
            curry2,
            price,
            amount: amountCount,
            spiceLevel: spiceCount,
            drink,
            complementary,
          }
          if(Object.keys(data).length=== 9){
            await createPendingOrders(token, data)
            if(page === "lunch"){
              dispatch(setLunchReRender(lunchReRender ? false: true))
            }else if(page === "dinner"){
              dispatch(setDinnerReRender( dinnerReRender? false: true))
            }
            dispatch(sendAlert("orderAdded"))
            setTimeout(() => {
              dispatch(sendAlert("off"))
            }, 1000);
          }
        }
      } catch (error) {
        console.log(error)
        
      }
      dispatch(turnOffTakeOrder("takeOrder"))
      dispatch(setTargetId(""))
      setAmountCount(1)
      setSpiceCount(0)
      setCurry1("")
      setCurry2("")
      setDrink("")
    }
    return (
    <>
      <RowContainer id={id} turnOn={turnOn}>
            <ItemTitleContainer>
              <ItemName className='itemName'>{itemName}</ItemName>
              {!turnOn ? <TakeOrderBtn onClick={handleTakeOrder}>Take Order</TakeOrderBtn>:
              targetId === id ?
              <TakeOrderButtonOnContainer>
                <TakeOrderFunctionButton onClick={handleConfirm} color={"green"}>Confirm</TakeOrderFunctionButton>
                <TakeOrderFunctionButton onClick={handleOrderCancel} color={"red"}>Cancel</TakeOrderFunctionButton>
              </TakeOrderButtonOnContainer>:null
              }
            </ItemTitleContainer>
            {turnOn && targetId === id ?
            <ExpandContainer>
                  {curryAmount === 1 ?
                  <ExpandRow>
                    <Lablel>Curry</Lablel>
                    <CurrySelectContainer>
                      <CurrySelect name='curry1' onChange={handleSelect}>
                      <CurryOption>None</CurryOption>
                        <CurryOption>{curryOptions[0]}</CurryOption>
                        <CurryOption>{curryOptions[1]}</CurryOption>
                        <CurryOption>{curryOptions[2]}</CurryOption>
                        <CurryOption>{curryOptions[3]}</CurryOption>
                      </CurrySelect>
                    </CurrySelectContainer>
                  </ExpandRow>
                  :curryAmount === 2?
                  <ExpandRow>
                    <Lablel>Curry</Lablel>
                    <CurrySelectContainer>
                      <CurrySelect name='curry1' onChange={handleSelect}>
                        <CurryOption>None</CurryOption>
                        <CurryOption>{curryOptions[0]}</CurryOption>
                        <CurryOption>{curryOptions[1]}</CurryOption>
                        <CurryOption>{curryOptions[2]}</CurryOption>
                        <CurryOption>{curryOptions[3]}</CurryOption>
                      </CurrySelect>
                      <CurrySelect name='curry2' onChange={handleSelect}>
                      <CurryOption>None</CurryOption>
                        <CurryOption>{curryOptions[0]}</CurryOption>
                        <CurryOption>{curryOptions[1]}</CurryOption>
                        <CurryOption>{curryOptions[2]}</CurryOption>
                        <CurryOption>{curryOptions[3]}</CurryOption>
                      </CurrySelect>
                    </CurrySelectContainer>
                  </ExpandRow>
                  :null
                }
            <ExpandRow>
              <Lablel>Amount</Lablel>
              <CounterContainer>
                <CounterButton id='minus' onClick={amountCounter}>
                 -
                  </CounterButton>
                <Count>{amountCount}</Count>
                <CounterButton id='add' onClick={amountCounter}>+</CounterButton>
              </CounterContainer>
            </ExpandRow>
            { curryAmount?
            <ExpandRow>
              <Lablel>Spice</Lablel>
              <CounterContainer>
                <CounterButton id='minus' onClick={spiceCounter}>-</CounterButton>
                <Count>{spiceCount}</Count>
                <CounterButton id='add' onClick={spiceCounter}>+</CounterButton>
              </CounterContainer>
            </ExpandRow>:null
            }
            { drinkOptions.length !== 0 ?
            <ExpandRow>
              <Lablel>Drink</Lablel>
              <Select name='drink' onChange={handleSelect}>
                <Option>None</Option>
                <Option>{drinkOptions[0]}</Option>
                <Option>{drinkOptions[1]}</Option>
                <Option>{drinkOptions[2]}</Option>
                <Option>{drinkOptions[3]}</Option>
              </Select>
            </ExpandRow> : null}
            { complementary?
            <ExpandRow color={"lightBlue"}>
              <Lablel>Complementary</Lablel>
              <Complementary className='complementary'>{complementary}</Complementary>
            </ExpandRow>:null
            }
          </ExpandContainer>:null
            }
          </RowContainer>
    </>
  )
}

export default TakeOrderItemRender
