import {useEffect, useState} from "react";

import {BodySlider, Nft, Slider} from "./sliderNft.styled";
import {nftSliders} from "../config";


export const SliderNft = () => {
    const [index, setIndex] = useState<number>(1);

    useEffect(() => {
        let insideIndex = 1;
        setInterval(() => {

            if(insideIndex === 9) {
                insideIndex = 1;
                return setIndex(1);
            }
            ++insideIndex
            return setIndex((prevIndex) => ++prevIndex );
        },
            400
        );
    }, []);

    return(
        <Slider>
            <BodySlider>
                <Nft
                    src={nftSliders[index]}
                />
            </BodySlider>
        </Slider>
    )
}