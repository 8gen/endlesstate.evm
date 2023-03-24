// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Endlesstate.sol";

contract EndlessTest is Test {
    Endlesstate public endless;
    function setUp() public {
        vm.startPrank(address(1));
        endless = new Endlesstate(address(3));
    }

    function testReserve() public {
        assertEq(endless.totalMinted(), 0);
        assertEq(endless.numberMinted(address(1)), 0);
        endless.reserve(10000);
        assertEq(endless.totalMinted(), 10000);
        assertEq(endless.numberMinted(address(1)), 10000);
    }

    function testURI() public {
        assertEq(endless.totalMinted(), 0);
        assertEq(endless.numberMinted(address(1)), 0);
        endless.reserve(1000);
        endless.setBaseURI("ipfs://123123/");
        assertEq(endless.tokenURI(1), "ipfs://123123/1.json");
    }

    function testTransfer() public {
        assertEq(endless.totalMinted(), 0);
        assertEq(endless.numberMinted(address(1)), 0);
        endless.reserve(1000);
        assertEq(endless.totalMinted(), 1000);
        assertEq(endless.numberMinted(address(1)), 1000);
        assertEq(endless.balanceOf(address(1)), 1000);
        assertEq(endless.ownerOf(1), address(1));
        endless.safeTransferFrom(address(1), address(2), 1);
        assertEq(endless.totalMinted(), 1000);
        assertEq(endless.numberMinted(address(1)), 1000);
        assertEq(endless.balanceOf(address(1)), 999);
        assertEq(endless.balanceOf(address(1)), 999);
        assertEq(endless.balanceOf(address(2)), 1);
        assertEq(endless.ownerOf(1), address(2));
    }
}
