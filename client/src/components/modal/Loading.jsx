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
    background-color: rgba(253, 255, 178, 0.8);
`
const Loading = () => {
  return (
    <Container>
      <ReactLoading
          type={"cylon"}
          color={"green"}
          height={"50%"}
          width={"50%"}
        />
    </Container>
  )
}

export default Loading
