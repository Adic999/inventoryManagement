import React,{useState} from 'react'
import styled from 'styled-components'
import PendingOrderCompleteModal from './modal/PendingOrderCompleteModal'
import PendingOrderDeleteModal from "./modal/PendingOrderDeleteModal"
import {updatePendingOrder} from '../functions/dailySaleFunction'
import {useDispatch, useSelector } from 'react-redux'
import { setPendingOrderReRender } from '../store/takeOrder'
import { isLoading, sendAlert } from '../store/alert'

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(auto, fit-content);
  padding: 5px;
  border: 1px solid black;
  margin-bottom: 10px;
`

const ItemRowContainer = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-columns: 2fr 5fr 1fr;
  grid-auto-rows: minmax(auto, fit-content);
  padding: 5px;
  align-items: center;
  text-align: end;
  margin-bottom: 5px;
  position: relative;
`
const Label = styled.p`
    font-size: large;
    font-weight: bold;
    margin-right: 5px;
`
const Input = styled.input`
  border: 1px solid black;
  padding: 0px 10px;
  height: 30px;
  width: 100%;
  font-size: large;
  background-color: ${props=>props.checked ? "red":"white"};
`

const ButtonsContainer = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Button = styled.button`
  height: 5vh;
  width: 32%;
  color: black;
  background-color: ${props => props.color};
  border: none;
  font-size: large;
  font-weight: bold;
`

const RenderPendingOrders = ({name,price,id, setPendingupdated,curry1, curry2, amount, spiceLevel, drink, complementary}) => {

    // getting token to send api requests
    const token = useSelector(state=> state.token.token)

    // states to check if the items are completed or not
    const [curry1state, setCurry1State] = useState(false)
    const [curry2state, setCurry2State] = useState(false)
    const [spiceState, setSpiceState] = useState(false)
    const [drinkState, setDrinkState] = useState(false)
    const [complementaryState, setComplementaryState] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [completeOpen, setCompleteOpen] = useState(false)

    // state to check if the edit is on or not
    const [edit, setEdit] = useState(false)

    const dispatch = useDispatch()
    const pendingOrderReRender = useSelector(state=>state.takeOrder.pendingOrderReRender)
    // all the value of the input elements
    const [curry1Input , setCurry1Input] = useState(curry1)
    const [curry2Input , setCurry2Input] = useState(curry2)
    const [amountInput , setAmountInput] = useState(amount)
    const [spiceLevelInput , setSpiceLevelInput] = useState(spiceLevel)
    const [drinkInput , setDrinkInput] = useState(drink)
    const [orderId, setOrderId] = useState("")

  const handleCheckBox = (e)=>{
    if(e.target.checked){
      if(e.target.previousSibling.name === "curry1"){
        setCurry1State(true)
      }
      else if(e.target.previousSibling.name === "curry2"){
        setCurry2State(true)
      }
      else if(e.target.previousSibling.name === "spice"){
        setSpiceState(true)
      }
      else if(e.target.previousSibling.name === "drink"){
        setDrinkState(true)
      }
      else if(e.target.previousSibling.name === "complementary"){
        setComplementaryState(true)
      }
    }else if(!e.target.checked){
        if(e.target.previousSibling.name === "curry1"){
            setCurry1State(false)
          }
          else if(e.target.previousSibling.name === "curry2"){
            setCurry2State(false)
          }
          else if(e.target.previousSibling.name === "spice"){
            setSpiceState(false)
          }
          else if(e.target.previousSibling.name === "drink"){
            setDrinkState(false)
          }
          else if(e.target.previousSibling.name === "complementary"){
            setComplementaryState(false)
          }
    }
  }

  // function to handle input values
  const handleInputs= (e)=>{
   if(e.target.name === "curry1"){
    setCurry1Input(e.target.value)
   }else if(e.target.name === "curry2"){
    setCurry2Input(e.target.value)
   }else if(e.target.name === "amount"){
    setAmountInput(parseInt(e.target.value))
   }else if(e.target.name === "spice"){
    setSpiceLevelInput(parseInt(e.target.value))
    console.log(typeof spiceLevelInput)
   }else if(e.target.name === "drink"){
    setDrinkInput(e.target.value)
   }
  }

  // handle edit button function
  const handleEdit= async ()=>{
    if(edit){
      dispatch(isLoading(true))
      setEdit(false)
      const data = {
        curry1: curry1Input,
        curry2: curry2Input,
        amount: amountInput,
        spiceLevel: spiceLevelInput,
        drink: drinkInput
      } 
      try {
        await updatePendingOrder(token, data,id)
        dispatch(setPendingOrderReRender(pendingOrderReRender ? false:true))
        dispatch(sendAlert("orderEdited"))
        setTimeout(() => {
          dispatch(sendAlert("off"))
        }, 1000);
      } catch (error) {
        dispatch(sendAlert("generalAlert"))
      }
      dispatch(isLoading(false))
    }else{
      setEdit(true)
    }
  }

  // handle pending order delete
  const handleDelete = (e)=>{
    setOrderId(e.target.parentNode.parentNode.id)
    setDeleteOpen(true)
  }
  
  // handle pending order complete
  const handleComplete = (e)=>{
    setOrderId(e.target.parentNode.parentNode.id)
    setCompleteOpen(true)
  }

  return (
    <>
    { deleteOpen ? <PendingOrderDeleteModal id={orderId}  setDeleteOpen={setDeleteOpen}/>:
    completeOpen ? <PendingOrderCompleteModal id={orderId} setCompleteOpen={setCompleteOpen}/>:
    <ItemContainer id={id}>
          <ItemRowContainer>
            <Label>Name:</Label>
            <Input name='name' value={name} disabled/>
          </ItemRowContainer>
          {curry1 ? <ItemRowContainer>
            <Label>Curry1:</Label>
            <Input name='curry1' onChange={handleInputs} disabled={!edit ? "disabled":null} checked={curry1state} value={curry1Input || ""} />
            <Input onClick={handleCheckBox} type="checkbox"/>
          </ItemRowContainer>:null}
          {curry2 ? <ItemRowContainer>
            <Label>Curry2:</Label>
            <Input name='curry2' onChange={handleInputs}  checked={curry2state} value={curry2Input || ""} disabled={!edit ? "disabled":null}/>
            <Input onClick={handleCheckBox} type="checkbox"/>
          </ItemRowContainer>:null}
          <ItemRowContainer>
            <Label>Amount:</Label>
            <Input type="tel" name='amount' onChange={handleInputs} value={amountInput || ""} disabled={!edit ? "disabled":null}/>
          </ItemRowContainer>
          {spiceLevel ? <ItemRowContainer>
            <Label>Spice Level:</Label>
            <Input name='spice' type="tel"  onChange={handleInputs} checked={spiceState}  value={spiceLevelInput || ""} disabled={!edit ? "disabled":null}/>
            <Input onClick={handleCheckBox} type="checkbox"/>
          </ItemRowContainer>:null}
          {drink ? <ItemRowContainer>
            <Label>Drink:</Label>
            <Input name='drink' onChange={handleInputs} checked={drinkState} value={drinkInput || ""} disabled={!edit ? "disabled":null}/>
            <Input onClick={handleCheckBox} type="checkbox"/>
          </ItemRowContainer>:null}
          {complementary ? <ItemRowContainer>
            <Label>Complementary:</Label>
            <Input name='complementary'checked={complementaryState}  value={complementary || ""} disabled/>
            <Input onClick={handleCheckBox} type="checkbox"/>
          </ItemRowContainer>:null}
          <ItemRowContainer>
          <Label>Price:</Label>
          <Input name="price" value={price || ""} disabled></Input>
          </ItemRowContainer>
          <ButtonsContainer>
            <Button color='green' onClick={handleComplete}>Complete</Button>
            <Button color='red' onClick={handleDelete}>Delete</Button>
            {!edit ? <Button onClick={handleEdit} color='orange'>Edit</Button>:<Button onClick={handleEdit} color='orange'>Confirm</Button>}
          </ButtonsContainer>
        </ItemContainer>}
    </>
  )
}

export default RenderPendingOrders
