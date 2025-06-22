import React from 'react'
import styled from 'styled-components'
import { handle2Home, handle2Tracks, handle2Users } from '../router/coordinator'
import { useNavigate } from 'react-router-dom';
import headphones from '../assets/headphones.png'
const StyledHome = styled.div`

display: grid;
grid-template-rows: 50vh auto;

.h50w100 {
  width: 100%;
  height: 100%;
  min-height: 37vh;
  background-color: #ffffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #333;
  padding-bottom: 20px;
  margin-bottom: 110px;
}
  .btnBox{
  display: flex;
  flex-flow: row wrap;
  height: 100%;
  align-items: flex-start;
  justify-content: space-around;
  gap: 150px;
  margin-top: -190px;
  padding-bottom: 30px;
}

.btnBoxClick{
  width: 230px;
  height: 210px;
  background-color: #874ae2ff;
  border-radius:999px;
  color: whitesmoke;
  z-index: 0 ;
}

.headphonesImg1{
position: absolute;
width: 290px;
height: 280px;
transform: translateX(-30px) translateY(-92px);
z-index: 1;
}

.headphonesImg2{
position: absolute;
width: 290px;
height: 280px;
transform: translateX(-30px) translateY(-112px);
z-index: 1;
}
`

export default function HomePage() {

  const navigate = useNavigate();
  return (
    <StyledHome>
      <div className="h50w100">
        <div className="banner">
          <h2 className="title text-purple-500 text-4xl text-center"><strong className="text-gray-900">Colab.</strong>Tracks</h2>
          <p className="slogan text-gray-500">Explore músicas e seja um colaborador fazendo o upload de novas músicas</p>
        </div>
      </div>
      <div className="h50w100">
        <div className="btnBox">
          <button className="btnBoxClick" onClick={()=> handle2Users(navigate)}>
             <img src={headphones} alt="headphones" className="headphonesImg1" />
           CADASTRO e LOGIN
          </button>
          <button className="btnBoxClick" onClick={() => handle2Tracks(navigate)}>
                         <img src={headphones} alt="headphones" className="headphonesImg2" />

            TRACKS</button>
        </div>
      </div>
    </StyledHome>
  )
}
