import React from 'react'
import styled from 'styled-components'

const StyledSignUpMessage = styled.div`
  position: fixed;
  top: 20%;
  left:20%;
  right: 5%;
  bottom: 5%;
background-color: rgba(255, 255, 255, 0.8);
border-radius: 20px;
padding: 20px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
z-index: 1000;
`

export default function SignUpMessage() {
  return (
    <StyledSignUpMessage>
      <h3>Usuário já Existe</h3>
    </StyledSignUpMessage>
  )
}
