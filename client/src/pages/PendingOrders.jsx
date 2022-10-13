import React,{useEffect} from 'react'
import styled from "styled-components"
import RenderPendingOrders from '../components/RenderPendingOrders'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changePageStatus } from '../store/pageSlice'
import { getPendingOrders } from '../functions/dailySaleFunction'
import { setPendingOrder} from '../store/takeOrder'


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
const PendingOrders = () => {

  // states responsible to check if the user is logged in
    const navigate = useNavigate()
    const loggedIn = useSelector((state)=>state.userState.loggedIn)
  
  // token to send api requests
    const token = useSelector((state)=>state.token.token)
  
  // to dispatch redux functions
    const dispatch = useDispatch()
  
  // state to store all the pending orders 
    const pendingList = useSelector(state=> state.takeOrder.pendingOrders)
  
  //state to know that the orders has updated in the database and pending orders page should also rerender
  const pendingOrderReRender= useSelector(state=> state.takeOrder.pendingOrderReRender)

  useEffect(()=>{
    if(!loggedIn || !token){
        navigate("/login")
        }else{
        dispatch(changePageStatus("pending orders"))
        renderPendingOrdersFunction()
        }
},[loggedIn, dispatch, token, navigate,pendingOrderReRender])
 
const renderPendingOrdersFunction = async ()=>{
  const response = await getPendingOrders(token)
  dispatch(setPendingOrder(response))
}
 
  return (
    <Container>
      <Wrapper>
        {pendingList.map((item)=>{
          return <RenderPendingOrders key={item._id} price={item.price} name={item.name} id={item._id} curry1={item.curry1} curry2={item.curry2} amount={item.amount} spiceLevel={item.spiceLevel} drink={item.drink} complementary={item.complementary} />
        })}
      </Wrapper>
    </Container>
  )
} 

export default PendingOrders
