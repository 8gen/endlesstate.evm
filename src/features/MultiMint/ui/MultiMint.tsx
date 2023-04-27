
import {useStore} from "effector-react";

import {ButtonMultiMint, MultiMintBody, MultiMintInput} from "./MultiMint.styled";

import {$isOwner} from "entities/User";
import mint from "features/Mint/ui/img/mint.png";
import {MultMintiNft} from "../model";


export const MultiMint = () => {

    const isOwner = useStore($isOwner);
    const {
        multiMint,
        count,
        onCount,
        to,
        onTo,
    } = MultMintiNft()

    if(!isOwner) return null;

    return(
        <MultiMintBody>
            <MultiMintInput
                type="number"
                placeholder={"X count"}
                value={count}
                onChange={(e) => onCount(e)}
            />

            <MultiMintInput
                type="text"
                placeholder={"0x..."}
                value={to}
                onChange={(e) => onTo(e)}
            />

            <ButtonMultiMint src={mint} alt="" onClick={multiMint} />
        </MultiMintBody>
    )
}