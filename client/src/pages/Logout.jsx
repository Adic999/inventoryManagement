import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { deleteToken } from '../store/tokenSlice'
const Logout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(deleteToken())
      navigate("/")
    },[dispatch, navigate])
  return (
    <>
    </>
  )
}

export default Logout
