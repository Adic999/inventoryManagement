import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { changePageStatus } from '../store/pageSlice'
import { createMenuItem } from '../functions/dailySaleFunction'
import {sendAlert} from "../store/alert"

const Container = styled.div`
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    height: 80%;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    padding: 5%;
    background-color: #eeeeee;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  padding: 5px;
`
const InputDiv = styled.div`
  height: 5vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background-color: #0F3460;
  color: white;
`
const InputDivRadio = styled.div`
  border: 1px solid black;
  height: 10vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  background-color: #0F3460;
  color: white;
`
const RadioInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5vh;
`
const RadioLabel = styled.label`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const RadioButton = styled.input`
  width: 50%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  border: none;
`
const Label = styled.label`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

`
const Input = styled.input`
  height: 100%;
  width: 50%;
  padding: 0px 10px;
  background-color: white;
  border: none;
`
const Button = styled.button`
  height: 5vh;
  width: 100%;
  color: white;
  background-color: green;
  border: none;
  font-size: large;
  cursor: pointer;
`

const CounterContainer = styled.div`
  display: flex;
  height: 100%;
  width: 50%;
  justify-content: space-between;
  align-items: center;
  color: white;
`
const CounterButton = styled.button`
  height: 100%;
  background-color: white;
  height: 100%;
  width: 33%;
  border: 1px solid black;
  color: black;
  font-size: larger;
  font-weight: bolder;
`

const CreateItem = () => {
    const navigate = useNavigate()
    const loggedIn = useSelector((state)=>state.userState.loggedIn)
    const token = useSelector((state)=>state.token.token)
    const itemDetailChoiceCurry = useSelector((state)=>state.itemDetail.choiceCurry)
    const itemDetailChoiceDrink = useSelector((state)=>state.itemDetail.choiceDrink)
    const itemDetailComplementary = useSelector((state)=>state.itemDetail.complementary)
    const dispatch = useDispatch()
    const [nameVal, setNameVal] = useState("")
    const [priceVal, setPriceVal] = useState(0)
    const [curryAmountVal, setCurryAmountVal] = useState(1)
    const [choiceCurryVal, setChoiceCurryVal] = useState(false)
    const [choiceDrinkVal, setChoiceDrinkVal] = useState(false)
    const [complementary, setComplementary] = useState(false)
    const [category, setCategory] = useState("")
    const [createObject, setCreateObject] = useState({})

    useEffect(()=>{
        if(!loggedIn || !token){
            navigate("/login")
            }else{
            dispatch(changePageStatus("create item"))
            }
    },[loggedIn, dispatch, token, navigate])

    useEffect(()=>{
      objectMaker()
    },[nameVal, priceVal, choiceCurryVal, choiceDrinkVal, complementary, category, curryAmountVal])


    // create an object of all the values before sending it to database
    const objectMaker = ()=>{
      setCreateObject({
        name: nameVal,
        price: priceVal,
       [choiceCurryVal ? "choiceCurry": null]:choiceCurryVal ? itemDetailChoiceCurry: null,
       [choiceCurryVal ? "curryAmount":null]:choiceCurryVal ? curryAmountVal:null,
       [choiceDrinkVal ? "choiceDrink":null]:choiceDrinkVal ? itemDetailChoiceDrink:null,
       [complementary ? "complementary":null]:complementary ? itemDetailComplementary: null,
        category: category
      })
    }

    // curry amount counter
    const handleCounter = (e)=>{
      e.preventDefault()
      if(e.target.id === "minus"){
        if(curryAmountVal > 1){
        setCurryAmountVal(curryAmountVal-1)
      }
      }else if(e.target.id === "plus"){
        if(curryAmountVal <2){
          setCurryAmountVal(curryAmountVal+1)
        }
      }
    }

    // curry choice function to see if there is curry choice
    const handleChoice = (e)=>{
      if(e.target.checked){
      if(e.target.id==="choiceCurry"){
        setChoiceCurryVal(e.target.checked)
      }else if(e.target.id === "choiceDrink"){
        setChoiceDrinkVal(e.target.checked)
      }else if(e.target.id === "complementary"){
        setComplementary(e.target.checked)
      }
    }else{
      if(e.target.id==="choiceCurry"){
        setChoiceCurryVal(e.target.checked)
      }else if(e.target.id === "choiceDrink"){
        setChoiceDrinkVal(e.target.checked)
      }else if(e.target.id === "complementary"){
        setComplementary(e.target.checked)
      }
    }
    }

    // checking the category of the item
    const handleCategory = (e)=>{
      setCategory(e.target.id)
    }

    //handle create item
    const handleCreateItem = async (e)=>{
      e.preventDefault()
      const filteredObject = Object.fromEntries(Object.entries(createObject).filter((entry)=>{
        const [key, value] = entry
        if(key !== "null" && value !== 0 && value !== ""){
          if(key !== "price"){
            if(typeof value === "object"){
              if(Object.values(value).length > 0){
                return {
                  ...createObject,
                  [key]:value
                }
              }
            }else{
              return {
                ...createObject,
                [key]:value
              }
            }
        }else{
          if(!isNaN(value)){
            return{
              ...createObject,
              [key]:value
            }
          }
        }
        }
      }
      ))
      if(filteredObject.price && filteredObject.name && filteredObject.category){
      const createItem = await createMenuItem(token, filteredObject)
      console.log(createItem)
      dispatch(sendAlert("itemCreated"))
      setTimeout(() => {
        dispatch(sendAlert("off"))
      }, 1000);
      }else{
        console.log("please fill required form")
      }
    }

    // const handle item name
    const handleName = (e)=>{
      setNameVal(e.target.value)
    }

    // handle item price
    const handlePrice = (e)=>{
      const numberPrice = parseInt(e.target.value)
      setPriceVal(numberPrice)
    }

  return (
    <Container>
      <Wrapper>
        <Form>
          <InputDiv>
          <Label htmlFor='name'>Name:</Label>
          <Input onChange={handleName} value={nameVal} id='name'/>
          </InputDiv>
          <InputDiv>
          <Label htmlFor='price'>Price:</Label>
          <Input type="number" onChange={handlePrice} value={priceVal || ""} id='price'/>
          </InputDiv>
          <InputDiv>
          <Label htmlFor='choiceCurry'>Choice Curry:</Label>
          <Input onClick={handleChoice} id='choiceCurry' type="checkbox"/>
          </InputDiv>
          {choiceCurryVal?<InputDiv>
          <Label htmlFor='curryAmount'>Curry Amount:</Label>
          <CounterContainer>
            <CounterButton onClick={handleCounter} id='minus'>-</CounterButton>
            {curryAmountVal}
            <CounterButton onClick={handleCounter} id='plus'>+</CounterButton>
          </CounterContainer>
          </InputDiv>:null}
          <InputDiv>
          <Label  htmlFor='choiceDrink' >Choice Drink:</Label>
          <Input onClick={handleChoice}  id='choiceDrink' type="checkbox"/>
          </InputDiv>
          <InputDiv>
          <Label htmlFor='complementary' >Complementary:</Label>
          <Input onClick={handleChoice} id='complementary' type="checkbox"/>
          </InputDiv>
          <InputDivRadio >
          <RadioInput >
            <RadioLabel htmlFor="lunch">Lunch</RadioLabel>
            <RadioButton onClick={handleCategory} type="radio" id='lunch' name='category'/>
          </RadioInput>
          <RadioInput>
          <RadioLabel htmlFor="dinner">Dinner</RadioLabel>
          <RadioButton onClick={handleCategory} type="radio" id='dinner' name='category'/>
          </RadioInput>
          </InputDivRadio>
          <Button onClick={handleCreateItem} >Create Item</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default CreateItem
