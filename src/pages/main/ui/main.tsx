

import {BodyMain, Icons, ItemNft, Items, SocIcon, Text, Title} from "./main.styled";
import {icons, nfts} from "../config";
import description from "./img/description.png";
import title from "./img/title.png";
import {MintBtn} from "features/Mint";
import {SliderNft} from "../../../widget/sliderNft";
import {MultiMint} from "../../../features/MultiMint";

export const Main = () => {
  return(
    <div>
      <BodyMain>
        <Title src={title} alt="" />

        <div >
          <Text src={description} alt="" />
        </div>

        <Items>
          {nfts.map(nft => (
              <ItemNft key={nft} src={nft} alt=""/>
          ))}
        </Items>

        <SliderNft />

        <MintBtn />

        <MultiMint/>
      </BodyMain>

      <Icons>
          {icons.map((icon)=>(
              <a key={icon.link} href={icon.link} target="_blank">
                  <SocIcon src={icon.img} alt="" />
              </a>
          )) }
      </Icons>
    </div>
  )
}