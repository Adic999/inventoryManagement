import React from 'react'
import styled, { keyframes } from 'styled-components'
import {useSelector} from 'react-redux'

const Container = styled.div`
    height: 5vh;
    width: 75%;
    background-color: #A1C298;
    position: fixed;
    right: 12.5%;
    bottom: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    z-index: 100;
    font-size: larger;
    font-weight: bold;
    border-radius: 50px;
`

const AlertModal = () => {
  const alert = useSelector(state=> state.alert.alert)
  const alertMessages = useSelector(state=> state.alert.alertMessages)
  return (
  <>
    {alert === "itemSold" ? 
    <Container>
      {alertMessages.itemSold}
    </Container>
    :alert === "itemDeleted" ? 
    <Container>
      {alertMessages.itemDeleted}
    </Container>
    :alert === "itemUpdated" ? 
    <Container>
      {alertMessages.itemUpdated}
    </Container>
    :alert === "itemCreated" ?
    <Container>
      {alertMessages.itemCreated}
    </Container>
    :alert === "orderAdded" ?
    <Container>
      {alertMessages.orderAdded}
    </Container>
    :alert === "orderCompleted" ? 
    <Container>
      {alertMessages.orderCompleted}
    </Container>
    :alert === "orderDeleted" ? 
    <Container>
      {alertMessages.orderDeleted}
    </Container>
    :alert === "orderEdited" ? 
    <Container>
      {alertMessages.orderEdited}
    </Container>
    :null
  }
  </>
  )
}

export default AlertModal
