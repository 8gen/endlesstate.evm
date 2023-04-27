
import {useState} from "react";
import {useConnect, useAccount} from "wagmi";
import {useWeb3Modal} from "@web3modal/react";

import {Button, MessageText} from "./Mint.styled";
import mint from "./img/mint.png";
import met from "./img/met.png";
import wc from "./img/Wallet.png";

import {connectorMetamask} from "shared/config/blockchain";
import {useMintFunction} from "../model";

export const MintBtn = () => {
    const {open, } = useWeb3Modal();
    const {connect} = useConnect()
    const account = useAccount();
    const [message, mintFunction] = useMintFunction();

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
               <Button src={mint} alt="" onClick={mintFunction} />
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