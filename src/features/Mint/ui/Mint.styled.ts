
import styled from 'styled-components';
import {messageType} from "../config";

export const BodyInfo = styled.div`
  width: 800px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 810px) {
    width: 500px;
  }

  @media (max-width: 520px) {
    width: 400px;
  }

  @media (max-width: 410px) {
    width: 300px;
  }
`

export const BodyTextInfo = styled.div`
  width: 47%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:20px;

  @media (max-width: 370px) {
    gap:10px;
  }
`

export const Text = styled.p`
  color:#FFFF;
  text-align: center;
  font-size: 20px;

  @media (max-width: 810px) {
    font-size: 16px;
  }

  @media (max-width: 520px) {
    font-size: 13px;
  }

  @media (max-width: 420px) {
    font-size: 10.5px;
  }
`

export const Button = styled.img
    .attrs((props: {isLast:boolean}) => props)`
  display: block;
  max-width: 300px;
  width: 100%;
  max-height: 73px;
  margin: 50px auto 0;
  cursor: pointer;
  margin-top:${props => props.isLast && '30px'};

  @media screen and (max-width:500px){
    width: 80%;
    margin-top:${props => props.isLast ? '25px' : '50px'};
  }

  @media screen and (max-width:400px){
    margin-top:${props => props.isLast ? '15px' : '30px'};
  }
`

export const MessageText = styled.p
    .attrs((props: {messageType:messageType}) => props)`
  color:${props => props.messageType === messageType.SUCCESS ? '#33ff42' : '#f81010'};
  font-size: 25px;
  margin-top: 20px;
`