import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { changePageStatus } from '../store/pageSlice'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TakeOrderItemRender from '../components/TakeOrderItemRender'
import { getMenuItems, getPendingOrders } from '../functions/dailySaleFunction'
import { check } from '../functions/compareArrays'
import { setPendingOrder,setMenuItems} from '../store/takeOrder'

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Wrapper = styled.div`
  border: 2px solid purple;
  height: 90%;
  width: 90%;
  padding: 5px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(5vh, fit-content);
`
const FilterContainer = styled.div`
  height: 5vh;
  width: 100%;
  padding: 2px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  align-items: center;
`
const PendingOrder = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 20px;
  font-weight: bold;
  background-color: orange;
`
const PendingNotification = styled.div`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  width:20%;
  background-color: blueviolet;
  border-radius: 50%;
  color: white;
`

const FilterInputDiv = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
`
const FilterInput = styled.input`
  height: 100%;
  width: 80%; 
  border: 1px solid black;
  border-radius: 0%;
  padding: 0% 5%;
`
const SearchButton = styled.button`
  width: 20%;
  height: 100%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: green;
  cursor: pointer;
`

const DisplayContainer = styled.div`
  height: 65vh;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: start;
  row-gap: 1%;
`
const Lunch = () => {
  
  // states responsible to verify the user is logged in
    const navigate = useNavigate()
    const loggedIn = useSelector((state)=>state.userState.loggedIn)
  
  // user token to send requests to api 
    const token = useSelector((state)=>state.token.token)
    const menuItems = useSelector((state)=>state.takeOrder.menuItems)
    const pendingOrders = useSelector((state)=>state.takeOrder.pendingOrders)
    const lunchReRender = useSelector((state)=>state.takeOrder.lunchReRender)

  // dispatch to use redux functions
    const dispatch = useDispatch()

    // input states of the input fields
    const [filterList, setFilterList] = useState([])
    const [inputVal, setInputVal] = useState("")

    useEffect(()=>{
        if(!loggedIn || !token){
            navigate("/login")
            }else{

              // change page status to lunch to change the title bar to lunch
              dispatch(changePageStatus("lunch"))

              renderLunchPage()

              // filter function to filter user query 
              handleFilter()
            }
    },[loggedIn, dispatch, token, navigate,inputVal, lunchReRender, menuItems, pendingOrders])


    const renderLunchPage = async ()=>{
      try {
        const lunchItems = await getMenuItems(token)
        const pendingOrdersFuncVar = await getPendingOrders(token)
        if(menuItems.length === 0 || check(menuItems, lunchItems) === false || check(pendingOrdersFuncVar, pendingOrders) === false){
          dispatch(setMenuItems(lunchItems))
          dispatch(setPendingOrder(pendingOrdersFuncVar))
        }
      } catch (error) {
        console.log(error)
      }
    }

 
    const handleInput = (e)=>{
      setInputVal(e.target.value)
    }
    
    const handleFilter = ()=>{
      const copyItems = [...menuItems]
      const filtered = copyItems.filter(item=>{
        if(inputVal === ""){
          return item
        }else if(item.name.toLowerCase().includes(inputVal.toLowerCase())){
          return item
        }
      })
      setFilterList(filtered)
    }
    const handlePendingOrder =()=>{
      navigate("/pendingOrders")
    }

    
  return (
    <>
    <Container>
      <Wrapper>
        <FilterContainer>
          <FilterInputDiv>
          <FilterInput onChange={handleInput} value={inputVal} />
            <SearchButton>
              <SearchOutlinedIcon/>
            </SearchButton>
          </FilterInputDiv>
          <PendingOrder onClick={handlePendingOrder}>
            Orders
            <PendingNotification>{pendingOrders.length}</PendingNotification>
          </PendingOrder>
        </FilterContainer>
        <DisplayContainer>
          {filterList.map(item=>{
            if(item.category === "lunch"){
            return <TakeOrderItemRender key={item._id} price={item.price} id={item._id} curryAmount={item.curryAmount} itemName={item.name} curryOptions={item.choiceCurry} drinkOptions={item.choiceDrink} complementary={item.complementary} />
}})}
        </DisplayContainer>
      </Wrapper>
    </Container>
    </>
  )
}

export default Lunch
