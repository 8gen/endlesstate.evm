
import styled from "styled-components";

export const Slider = styled.div`

  width: 400px;
  max-width: 80%;
  
  overflow: hidden;
  
  margin: 0 auto;
  margin-top: 50px;

  @media(max-width:515px){
    margin-top: 30px;
  }

  @media(max-width:450px){
    margin-top: 20px;
  }
`

export const BodySlider = styled.div`
  display: flex;
`

export const Nft = styled.img`
  flex: 0 0 100%;
  min-width: 0;
`