import React from 'react'
import ReactLoading from "react-loading";
import styled from 'styled-components';

const Container = styled.div`
    height: 90vh;
    width: 100vw;
    position: absolute;
    z-index: 200;
    display: flex;
    top: 0%;
    align-items: flex-end;
    justify-content: center;
    background: none;
`
const Loading = () => {
  return (
    <Container>
      <ReactLoading
          type={"spin"}
          color={"green"}
          height={"25%"}
          width={"25%"}
        />
    </Container>
  )
}

export default Loading
