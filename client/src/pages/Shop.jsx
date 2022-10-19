import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { changePageStatus } from '../store/pageSlice'
import ShopComponent from '../components/ShopComponent'
import { changeToLogOut } from '../store/navBarSlice'

const Shop = () => {
    const navigate = useNavigate()
    const loggedIn = useSelector((state)=>state.userState.loggedIn)
    const token = useSelector((state)=>state.token.token)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!loggedIn || !token){
            navigate("/login")
            }else{
            dispatch(changePageStatus("shop"))
            changeToLogOut()
            }
    },[loggedIn, dispatch, token, navigate])
 
  return (
    <div>
      <ShopComponent/>
    </div>
  )
}

export default Shop
