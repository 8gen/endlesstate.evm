import {useAccount, useNetwork, useSwitchNetwork} from "wagmi";
import React, { useEffect} from "react";

import {currentChain} from "shared/config/blockchain";


export const ProtectedNetwork = ({children}:{children:React.ReactNode}) => {
    const { chain,  } =
        useNetwork()
    const {  switchNetworkAsync } =
        useSwitchNetwork()

    useEffect(() => {

        const switchChain = async () => {
            if(chain?.id !== currentChain.id) {
                console.log(chain?.id)
                await switchNetworkAsync?.(currentChain.id)
            }
        }

        switchChain()

    }, [chain])

    return <>{children}</>;
}