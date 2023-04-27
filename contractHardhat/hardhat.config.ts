


import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'solidity-coverage'
require('dotenv').config()

const getEnvVar = (key: string) => {
  if (process.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return process.env[key] || "";
};

export const ALCHEMY_KEY = getEnvVar("ALCHEMY_MAINNET_KEY");
export const PRIVATE_KEY = getEnvVar("PRIVAT_MAINNET_KEY");
export const ETHERSCAN = getEnvVar("ETHERSCAN_MAINNET_KEY");

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000
      },

    }
  },
  networks: {
    sepolia: {
      chainId: 5,
      url:`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_KEY}`,
      accounts:[PRIVATE_KEY],
    },

    mainnet: {
      chainId: 1,
      url:`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`,
      accounts:[PRIVATE_KEY],
    },

    hardhat: {
      chainId: 1337
    }
  },
  etherscan: {
    apiKey: ETHERSCAN,
  },
};

export default config;