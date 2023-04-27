import {
    useAccount,
    useContract, useSigner,
} from 'wagmi'
import {parseEther} from "viem";
import {useState} from "react";
import {useStore} from "effector-react";

import nft from "shared/config/blockchain/contracts/nft.json";
import {defaultValue, Message, messageType, returnMintFunction} from "../config";
import {formaterErrors} from "../lib";
import {$isOwner} from "../../../entities/User";


export const useMintFunction = (): returnMintFunction => {
    const [message, setMessage] = useState<Message>(defaultValue)
    const {address} = useAccount();
    const { data: signer, } = useSigner();
    const isOwner = useStore($isOwner)
    const contract = useContract({
        ...nft,
        signerOrProvider: signer,
    })

    const mintFunction = async () => {
        const priceNft = 0.005;
        const count = 1;

        const price = isOwner ? 0 :  parseEther(`${priceNft * count}`);

        try {
            const mintCall = await contract?.mint(count, address, {
                value:price
            });

            setMessage({
                text:'Nft buy!',
                type:messageType.SUCCESS
            });


        } catch (e:any) {


            const messageConfig = {
                text:'',
                type:messageType.ERROR
            };

            messageConfig.text = formaterErrors(String(e));

            setMessage(messageConfig)
        }
    }

    return [message, mintFunction];

}