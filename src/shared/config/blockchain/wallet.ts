import { configureChains, createClient } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public'
import {mainnet, sepolia} from '@wagmi/chains';

import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

import {chainId, projectId, rpc} from "../variables/index";
import { EthereumClient } from '@web3modal/ethereum';

export const currentChain = chainId === '1' ? mainnet : sepolia

export  const { chains, provider } = configureChains(
    [ currentChain ],
    [
        publicProvider(),
        jsonRpcProvider({
            rpc: () => ({
                http: rpc,
            }),
            stallTimeout: 1000,
        }),
    ]
)

export const connectorWC = new WalletConnectConnector({
    chains,
    options: {
        projectId,
        isNewChainsStale: false,
    },
})

export const connectorMetamask = new MetaMaskConnector({
    chains,
})

export const wagmiClient = createClient({
    autoConnect: true,
    connectors: [
        connectorWC,
        connectorMetamask,
    ],
    provider
})

export const ethereumClient = new EthereumClient(wagmiClient, chains);
