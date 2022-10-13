import React,{useEffect, useState} from 'react'
import styled from "styled-components"
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changePageStatus } from '../store/pageSlice'
import RenderSales from '../components/RenderSales'
import {getCompletedOrders} from "../functions/dailySaleFunction.js"
const Container = styled.div`
  background-color: palegoldenrod;
  height: 80vh;
  width: 100%;
  padding: 10px;
`
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: #eeeeee;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(auto, max-content);
  overflow-y: scroll;
`
const FilterContainer = styled.div`
  height: 5vh;
  width: 100%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
`

const FilterSelect = styled.select`
  width: 30%;
  height: 100%;
  font-size: 15px;
`
const FilterOptions = styled.option`
 
`
const SeeSale = () => {
    const navigate = useNavigate()
    const loggedIn = useSelector((state)=>state.userState.loggedIn)
    const token = useSelector((state)=>state.token.token)
    const dispatch = useDispatch()
    const [select, setSelect] = useState("today")
    const [filteredList, setFilteredList] = useState([])
    const date = new Date()
    const today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate())
    const [orders, setOrders] = useState([])
  
  useEffect(()=>{
    if(!loggedIn || !token){
        navigate("/login")
        }else{
        dispatch(changePageStatus("see sale"))
        }
},[loggedIn, dispatch, token, navigate])

useEffect(()=>{
  filterFunction()
  if(orders.length === 0){
    getOrders()
  }
},[select, orders])

const getOrders = async ()=>{
  const response = await getCompletedOrders(token)
  setOrders(response)
}

const filterFunction =()=>{
  let filtered = [...orders]
  filtered = filtered.filter(item=>{
    if(typeof item === "object"){
    const itemYear = parseInt(new Date(item.createdAt).toLocaleDateString().split("/")[2])
    const itemMonth = parseInt(new Date(item.createdAt).toLocaleDateString().split("/")[0])
    const itemDate = parseInt(new Date(item.createdAt).toLocaleDateString().split("/")[1])
    const itemFullDate = `${itemYear}-${itemMonth}-${itemDate}`

    if(select === "today"){
    if(itemFullDate === today){
      return item
    }
  }else if(select === "this week"){
    if((date.getMonth()+ 1) === itemMonth && (date.getDate()-itemDate < 7)){
      return item
    }
  }else if(select === "this month"){
    if((date.getMonth()+ 1) === itemMonth){
      return item
    }
  }}
  })
  setFilteredList(filtered)
}

const handleFilterSelect = (e)=>{
  setSelect(e.target.value)
}

return (
    <Container>
      <Wrapper>
        <FilterContainer>
          <FilterSelect value={select} onChange={handleFilterSelect}>
            <FilterOptions>today</FilterOptions>
            <FilterOptions>this week</FilterOptions>
            <FilterOptions>this month</FilterOptions>
          </FilterSelect>
        </FilterContainer>
      {filteredList.map((item)=>{
        const itemYear_ = parseInt(new Date(item.createdAt).toLocaleDateString().split("/")[2])
        const itemMonth_ = parseInt(new Date(item.createdAt).toLocaleDateString().split("/")[0])
        const itemDate_ = parseInt(new Date(item.createdAt).toLocaleDateString().split("/")[1])
        const itemFullDate_ = `${itemYear_}-${itemMonth_}-${itemDate_}`
          return <RenderSales key={item._id} date={itemFullDate_} name={item.name} id={item._id} curry1={item.curry1} curry2={item.curry2} amount={item.amount} spiceLevel={item.spiceLevel} drink={item.drink} complementary={item.complementary} />
        })}
      </Wrapper>
    </Container>
  )
}

export default SeeSale
