import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import {parseEther} from "viem";
import { expect } from "chai";

const COUNT = 1;

const PRICE_NORMAL = '0.005';
const PRICE = ethers.utils.parseEther(PRICE_NORMAL);

describe("Endlesstate", function () {
  async function deployOneYearLockFixture() {

    const [
        owner,
        otherAccount1,
        otherAccount2,
        otherAccount3,
        otherAccount4,
        otherAccount5
    ] = await ethers.getSigners();


    const Endlesstate = await ethers.getContractFactory("Endlesstate");
    const endlesstate = await Endlesstate.deploy(PRICE);
    console.log(PRICE)

    return { endlesstate, owner, otherAccount1,otherAccount2,otherAccount3,otherAccount4,otherAccount5 };
  }

  describe("TEST NFT MINT", function () {
    it("MINT OWNER", async function () {
      const { endlesstate, owner, otherAccount1, otherAccount2 } = await loadFixture(deployOneYearLockFixture);

      const mintCall = await endlesstate?.connect(owner).mint(COUNT, otherAccount1.address, );
      const isBalance = await endlesstate?.balanceOf(otherAccount1.address);

      expect(Number(isBalance)).to.equal(1);


      const mintCallMore = await endlesstate?.connect(owner).mint(150, otherAccount2.address, );
      const isBalanceMore = await endlesstate?.balanceOf(otherAccount2.address);

      expect(Number(isBalanceMore)).to.equal(150);
    });

    it("MINT USERS", async function () {
      const { endlesstate, owner, otherAccount1, otherAccount2 } = await loadFixture(deployOneYearLockFixture);

      const mintCall = await endlesstate?.connect(otherAccount1).mint(COUNT, otherAccount1.address,
          {value: ethers.utils.parseEther((COUNT * +PRICE_NORMAL).toString())}
      );
      const isBalance = await endlesstate?.balanceOf(otherAccount1.address);
      expect(Number(isBalance)).to.equal(1);

      await expect(
          endlesstate?.connect(otherAccount1).mint(COUNT, otherAccount1.address)
      ).to.be.revertedWith("PRICE");

      expect(
          await endlesstate?.tokenURI(1)
      ).to.equal("ipfs://QmSDTSsJiTvZ4fqJxyhAxVfMYpmtiw7danj54qgch9UeQk/1");

      const balanceBefore = await owner.getBalance();
      await endlesstate?.connect(owner).withdraw();
      const balanceAfter = await owner.getBalance();


      await expect(
          balanceBefore
      ).not.to.equal(balanceAfter);


      expect(
        await endlesstate?.baseURI()
      ).to.equal("ipfs://QmSDTSsJiTvZ4fqJxyhAxVfMYpmtiw7danj54qgch9UeQk/");

      await endlesstate?.setBaseURI("1");

      expect(
        await endlesstate?.baseURI()
      ).to.equal("1");
    });
  });
});
