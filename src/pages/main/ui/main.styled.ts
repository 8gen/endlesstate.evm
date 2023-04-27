
import styled from "styled-components";

export const BodyMain = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.img`
  display: block;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  @media screen and (max-width:500px){
    width: 80%;
  }

  @media(max-width:840px){
    padding: 0 20px;
  }
  
  @media(max-width:515px){
    width: 77%;
  }
`

export const Text = styled.img`
  max-width: 1000px;
  width: 100%;
  display: block;
  margin: 35px auto 15px;
  
  @media screen and (max-width:894px) {
    padding: 0 20px;
  }

  @media(max-width:515px){
    width: 100%;
    margin-top: 25px;
    padding: 0 10px;
  }
`

export const Items = styled.div`
  margin: 30px auto;
  margin-top: 20px;
  display: flex;
  width: 100%;
  max-width: 850px;
  gap: 62px;
  justify-content: center;
  flex-wrap: wrap;
  
  @media screen and (max-width: 570px){
    gap: 30px;
  }

  @media(max-width:515px){
    margin-top: 15px;
  }

  @media(max-width:450px){
    gap: 20px;
  }
`

export const ItemNft = styled.img`
  width: 120px;
  height: 120px;

  @media screen and (max-width:570px) {
    width: 75px;
    height: 75px;
  }
`

export const Icons = styled.div`
  justify-content: flex-end;
  padding-right: 70px;
  display: flex;
  column-gap: 25px;
  margin-top: 40px;
  margin-bottom: 80px;
  
  @media(max-width:850px) {
    margin-top: 70px;
    padding-right: 40px;
  }

  @media(max-width:450px) {
    padding-right: 30px;
  }
`

export const SocIcon = styled.img`
  width: 54px;
  height: 54px;
  
  @media(max-width:850px) {
    width: 34px;
    height: 34px;
  }

  @media(max-width:450px) {
    width: 30px;
    height: 30px;
  }
`