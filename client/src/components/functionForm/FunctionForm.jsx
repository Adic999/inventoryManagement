import React,{useState} from 'react'
import styled from "styled-components";
import { useSelector } from 'react-redux';
import DeleteModal from "../modal/DeleteModal"
import FuncBtnComoponent from '../functionButtons/FuncBtnComoponent';
import { createShopItem } from '../../functions/shopFunction';
import { useEffect } from 'react';

const Form = styled.form`
  border: 1px solid black;
  height: 100%;
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
`
const FormInput = styled.input`
  border: 1px solid black;
  min-height: 5vh;
  margin: 1%;
  width: 100%;
  padding: 5px;
  font-size: 15px;
`
const AddItemButton = styled.button`
  border: 1px solid black;
  min-height: 5vh;
  width: 100%;
  background-color: ${props => props.color};
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`

const FunctionForm = ({userItems,setUserItems}) => {
  const soldOn = useSelector(state => state.funcState.soldOn)
  const updateOn = useSelector(state => state.funcState.updateOn)
  const deleteOn = useSelector(state => state.funcState.deleteOn)
  const status = useSelector(state=> state.tempData.tempData)
  const token = useSelector(state=> state.token.token)
  const [placeHolder, setPlaceHolder] = useState({})
  const [soldInput, setSoldInput] = useState({})

  useEffect(()=>{
    setSoldInput({...status})
    setPlaceHolder({...status})
  },[status])
  // NORMAL INPUT FORM START
  const [normalInput, setNormalInput] = useState({
    name: "",
    amount:"",
    costPrice: "",
    sellPrice: "",
    seller: "",
  })

  const handleNormalInput = (e)=>{
    setNormalInput({
      ...normalInput,
      [e.target.name]:e.target.value
    })
  }
  // NORMAL INPUT FORM END

  // CREATE AN ITEM START

  const handleAddItem = async(e)=>{
    e.preventDefault()
    let emptyField = false
    const numberAmount = Number(normalInput.amount)
    const numberCostPrice = Number(normalInput.costPrice)
    const numberSellPrice = Number(normalInput.sellPrice)
    const data = {
      ...normalInput,
      amount:numberAmount,
      costPrice:numberCostPrice,
      sellPrice:numberSellPrice
    }
    Object.values(data).forEach(value=>{
      if(!value){
        emptyField = true
      }
    })
    if(!emptyField){
    const createItem = await createShopItem(token,data)
    if(createItem === "Not authorized" || createItem === "ERROR OCCURED WHILE CREATING ITEM" || createItem === "ITEM ALREADY EXISTS"|| createItem === "INVALID TYPE ARGUMENT"){
      console.log(createItem)
    }else{
      console.log("ITEM CREATED SUCCESSFULLY")
      setUserItems([
        ...userItems,
        createItem
      ])
    }
  }else{
    console.log("CANNOT LEAVE EMPTY FIELD")
  }
  }
  // CREATE AN ITEM END

  // UPDATE FORM START

  const [customInput, setCustomInput] = useState({})

  const handelCustomInput = (e)=>{
    e.preventDefault()
    setCustomInput({
      ...customInput,
      [e.target.name]:e.target.value})
  }
  // UPDATE FORM END

  // SOLD FORM START

  const handleSoldInput = (e)=>{
    setSoldInput({
      ...soldInput,
      amount: e.target.value
    })
  }

  // SOLD FORM END

  return (
    <>
    {soldOn? 
      <Form>
      <FormInput  disabled name='name' placeholder={placeHolder.name} value={soldInput.name ? soldInput.name : ""}/>
      <FormInput onChange={handleSoldInput} name='amount' placeholder="amount" value={soldInput.amount ? soldInput.amount : ""}/>
      <FormInput  disabled name='costPrice' placeholder={placeHolder.costPrice} value={soldInput.costPrice ? soldInput.costPrice : ""}/>
      <FormInput  disabled name='sellPrice' placeholder={placeHolder.sellPrice} value={soldInput.sellPrice ? soldInput.sellPrice : ""}/>
      <FormInput  disabled name='seller' placeholder={placeHolder.seller} value={soldInput.seller ? soldInput.seller : ""}/>
      <FuncBtnComoponent userItems={userItems} setUserItems={setUserItems} token={token} list={soldInput} button={"sold"}/>
    </Form>:updateOn?
    <Form> 
      <FormInput onChange={handelCustomInput} name='name' placeholder={placeHolder.name} value={customInput.name ? customInput.name : ""}/>
      <FormInput onChange={handelCustomInput} name='amount' placeholder={placeHolder.amount} value={customInput.amount ? customInput.amount : ""}/>
      <FormInput onChange={handelCustomInput} name='costPrice' placeholder={placeHolder.costPrice} value={customInput.costPrice ? customInput.costPrice : ""}/>
      <FormInput onChange={handelCustomInput} name='sellPrice' placeholder={placeHolder.sellPrice} value={customInput.sellPrice ? customInput.sellPrice : ""}/>
      <FormInput onChange={handelCustomInput} name='seller' placeholder={placeHolder.seller} value={customInput.seller ? customInput.seller : ""}/>
    <FuncBtnComoponent userItems={userItems} setUserItems={setUserItems} token={token} list={customInput} button={"update"}/>
  </Form>:deleteOn?
  <DeleteModal userItems={userItems} setUserItems={setUserItems}/>:
  <Form >
      <FormInput onChange={handleNormalInput} name='name' placeholder='name' value={normalInput.name}/>
      <FormInput onChange={handleNormalInput} type="tel" name='amount' placeholder='amount' value={normalInput.amount}/>
      <FormInput onChange={handleNormalInput} name='costPrice' placeholder='cost price' value={normalInput.costPrice}/>
      <FormInput onChange={handleNormalInput} name='sellPrice' placeholder='sell price' value={normalInput.sellPrice}/>
      <FormInput onChange={handleNormalInput} name='seller' placeholder='seller' value={normalInput.seller}/>
      <AddItemButton onClick={handleAddItem} color='green' name='addItem' >ADD ITEM</AddItemButton>
  </Form>
  }
    </>
  )
}

export default FunctionForm
