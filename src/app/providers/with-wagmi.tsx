
import {WagmiConfig} from "wagmi";
import {Web3Modal} from "@web3modal/react";

import {ethereumClient, wagmiClient} from "shared/config/blockchain";
import {projectId} from "shared/config/variables";


export const withWagmi = (component: () => React.ReactNode) => () => (
    <>
        <WagmiConfig client={wagmiClient}>
            {component()}
        </WagmiConfig>

        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
);