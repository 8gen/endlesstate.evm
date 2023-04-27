
import styled from 'styled-components';
import {messageType} from "../config";

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