// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Endlesstate.sol";

contract EndlesstateScript is Script {
    function setUp() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Endlesstate nft = new Endlesstate(
            0x207Fa8Df3a17D96Ca7EA4f2893fcdCb78a304101,
            0.1 ether
        );
        nft.setBaseURI("ipfs://QmerxUCBQdbeJxnJuVreHo6EAa15UwNK4vyAj76QRc6syg/");
        nft.reserve(1000);
        vm.stopBroadcast();
    }

    function run() public {
        vm.broadcast();
    }
}
