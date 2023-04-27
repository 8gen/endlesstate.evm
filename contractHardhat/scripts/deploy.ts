import { ethers } from "hardhat";

require('dotenv').config()

const getEnvVar = (key: string) => {
  console.log(process.env[key])
  if (process.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return process.env[key] || "";
};

const PRICE_NORMAL = '0.005';
const PRICE = ethers.utils.parseEther(PRICE_NORMAL);

async function main() {
  const [owner] = await ethers.getSigners();
  console.log(PRICE)
  const Endlesstate = await ethers.getContractFactory("Endlesstate");
  const endlesstate = await Endlesstate.deploy(PRICE);

  await endlesstate.deployed();

  console.log(`deployed to ${endlesstate.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
