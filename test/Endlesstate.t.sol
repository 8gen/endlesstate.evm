// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Endlesstate.sol";

contract EndlessTest is Test {
    Endlesstate public endless;
    uint256 forkId;

    function setUp() public {
        string memory RPC_URL = vm.envString("RPC_URL");
        forkId = vm.createSelectFork(RPC_URL, 40708620);
        vm.startPrank(address(1));
        endless = new Endlesstate(
            0x207Fa8Df3a17D96Ca7EA4f2893fcdCb78a304101,
            0.1 ether
        );
    }

    function testMint() public {
        assertEq(endless.totalMinted(), 0);
        assertEq(endless.numberMinted(address(1)), 0);
        vm.stopPrank();
        deal(address(2), 1 ether);
        vm.startPrank(address(2));
        uint256 before = address(1).balance;
        endless.mint{value: 0.1 ether}(1);
        assertEq(endless.totalMinted(), 1);
        assertEq(endless.numberMinted(address(2)), 1);
        assertEq(address(1).balance - before, 0.1 ether);
    }

    function testMintWithWrongPrice() public {
        vm.stopPrank();
        deal(address(2), 1 ether);
        vm.startPrank(address(2));
        vm.expectRevert("PRICE");
        endless.mint{value: 0.05 ether}(1);
        assertEq(endless.totalMinted(), 0);
    }

    function testReserve() public {
        assertEq(endless.totalMinted(), 0);
        assertEq(endless.numberMinted(address(1)), 0);
        endless.reserve(100);
        assertEq(endless.totalMinted(), 100);
        assertEq(endless.numberMinted(address(1)), 100);
    }

    function testURI() public {
        assertEq(endless.totalMinted(), 0);
       assertEq(endless.numberMinted(address(1)), 0);
        endless.reserve(100);
        endless.setBaseURI("ipfs://123123/");
        assertEq(endless.tokenURI(1), "ipfs://123123/1.json");
    }

    function testTransfer() public {
        assertEq(endless.totalMinted(), 0);
        assertEq(endless.numberMinted(address(1)), 0);
        endless.reserve(100);
        assertEq(endless.totalMinted(), 100);
        assertEq(endless.numberMinted(address(1)), 100);
        assertEq(endless.balanceOf(address(1)), 100);
        assertEq(endless.ownerOf(1), address(1));
        endless.safeTransferFrom(address(1), address(2), 1);
        assertEq(endless.totalMinted(), 100);
        assertEq(endless.numberMinted(address(1)), 100);
        assertEq(endless.balanceOf(address(1)), 99);
        assertEq(endless.balanceOf(address(1)), 99);
        assertEq(endless.balanceOf(address(2)), 1);
        assertEq(endless.ownerOf(1), address(2));
    }
    function testTooMuch() public {
        assertEq(endless.totalMinted(), 0);
        assertEq(endless.numberMinted(address(1)), 0);
        endless.reserve(100);
        assertEq(endless.totalMinted(), 100);
        assertEq(endless.numberMinted(address(1)), 100);

        assertEq(endless.collectionSize(), 10000);
        vm.store(address(endless), bytes32(uint256(12)), bytes32(uint256(100)));
        assertEq(endless.collectionSize(), 100);

        vm.expectRevert("TOO_MUCH");
        endless.reserve(100);
        vm.expectRevert("TOO_MUCH");
        endless.mint{value:0.1 ether}(1);
        assertEq(endless.totalMinted(), 100);
        assertEq(endless.numberMinted(address(1)), 100);
    }
}
