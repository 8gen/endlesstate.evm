import {useState} from "react";
import {useContract, useSigner} from "wagmi";

import nft from "shared/config/blockchain/contracts/nft.json";
import {messageType} from "../../Mint/config";
import {formaterErrors} from "../../Mint/lib";

type eventInput =  React.ChangeEvent<HTMLInputElement>

export const MultMintiNft = () => {
    const [count, setCount] = useState<string>('');
    const [to, setTo] = useState<string>('');

    const { data: signer, } = useSigner();
    const contract = useContract({
        ...nft,
        signerOrProvider: signer,
    })

    const onCount = (e:eventInput) => {
        setCount(e.target.value);
    }

    const onTo = (e:eventInput) => {
        setTo(e.target.value);
    }

    const multiMint = async  () => {
        try {
            const mintCall = await contract?.mint(+count, to);
        } catch (e:any) {
            console.log(e.data.message);
        }
    }

    return {
        multiMint,
        count,
        onCount,
        to,
        onTo,
    }
}