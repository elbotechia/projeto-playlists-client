import React from 'react'
import styled from 'styled-components'
import { handle2Home, handle2Tracks, handle2Users } from '../router/coordinator'
import { useNavigate } from 'react-router-dom';
import headphones from '../assets/headphones.png'
const StyledHome = styled.div`

`

export default function HomePage() {


  return (
    <StyledHome>
      <div className="h50w100">
        <div className="banner">
          <h2 className="title text-purple-500 text-4xl text-center"><strong className="text-gray-900">Colab.</strong>Tracks</h2>
          <p className="slogan text-gray-500">Explore músicas e seja um colaborador fazendo o upload de novas músicas</p>
        </div>
      </div>
   
    </StyledHome>
  )
}
