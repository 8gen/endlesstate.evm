
import {useConnect, useAccount} from "wagmi";
import {useWeb3Modal} from "@web3modal/react";

import {Button, MessageText, Text, BodyInfo, BodyTextInfo} from "./Mint.styled";
import mint from "./img/mint.png";
import met from "./img/met.png";
import wc from "./img/Wallet.png";

import {connectorMetamask} from "shared/config/blockchain";
import {useMintFunction} from "../model";

export const MintBtn = () => {
    const {open, } = useWeb3Modal();
    const {connect} = useConnect()
    const account = useAccount();
    const [message, mintFunction, countNft] = useMintFunction();

    const connectWallet = (isConnector:'wc' | 'metamask') => async () => {
        if(isConnector === 'wc') {
            await open();
        } else {
            await connect({
                connector: connectorMetamask,
            })
        }

    }

    return(
       <>
           {account?.address ?
                <>
                    <BodyInfo>
                        <BodyTextInfo>
                            <Text>Number of remaining nfts</Text> 
                            <Text>{10000 - countNft}</Text>
                        </BodyTextInfo>
                        
                        <BodyTextInfo>
                            <Text>Price per nft</Text> 
                            <Text>0.05 eth</Text>
                        </BodyTextInfo>
                        

                    </BodyInfo>
                    
                    <Button src={mint} alt="" onClick={mintFunction} />
                </>
               :
               <>
                   <Button src={wc} alt="" onClick={connectWallet('wc')} />
                   <Button src={met} alt="" onClick={connectWallet('metamask')} isLast />
               </>
           }

           <MessageText messageType={message.type}>{message.text}</MessageText>
       </>
    )
}