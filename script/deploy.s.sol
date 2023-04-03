// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Endlesstate.sol";

contract EndlesstateScript is Script {
    function setUp() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Endlesstate nft = new Endlesstate(
            0x881840Cc8F558F35D62388c0eF324499889aCA88,
            0.01 ether
        );
        nft.setBaseURI("ipfs://QmRPSubNW7AiKqEWQRHvdEq6m9qYFzddxEXSqMqS4AZJFj/");
        // nft.reserve(1000);
        vm.stopBroadcast();
    }

    function run() public {
        vm.broadcast();
    }
}
