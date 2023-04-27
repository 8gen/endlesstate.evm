import {useAccount, useContract, useProvider} from "wagmi";
import React, { useEffect} from "react";

import nft from "../../shared/config/blockchain/contracts/nft.json";
import {setOwner} from "../../entities/User";


export const SetIsOwner = ({children}:{children:React.ReactNode}) => {
    const { address,  } = useAccount();
    const provider = useProvider()
    const contract = useContract({
        ...nft,
        signerOrProvider: provider,
    })

    useEffect(() => {

        const setIsOwnerAsync = async () => {
            const getOwner = await contract?.owner();
            const isOwner = getOwner === address ;

            setOwner(isOwner);
        }

        setIsOwnerAsync()

    }, [address, contract])

    return (<>{children}</>);
}