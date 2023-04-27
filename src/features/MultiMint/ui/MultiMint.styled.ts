import styled from "styled-components";


export const MultiMintBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;


  max-width: 300px;
  width: 100%;
  
  margin-top: 20px;
`

export const MultiMintInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 30px;
  padding: 0 20px;
  margin-bottom:20px;
  
  font-size: 20px;
`


export const ButtonMultiMint = styled.img`
  display: block;
  width: 100%;
  max-height: 73px;
  cursor: pointer;

  @media screen and (max-width:500px){
    width: 80%;
  }

`