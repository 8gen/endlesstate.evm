// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./common/meta-transactions/ContentMixin.sol";
import "./common/meta-transactions/NativeMetaTransaction.sol";


contract OwnableDelegateProxy {}
/**
 * Used to delegate ownership of a contract to another address, to save on unneeded transactions to approve contract use for users
 */
contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}


contract Endlesstate is ERC721A, ContextMixin, NativeMetaTransaction, Ownable {
    using Strings for uint256;
    using Address for address;

    // Catllection size
    uint256 public immutable collectionSize;

    // Max group size of cats for reserve
    uint256 internal immutable maxBatchSize;

    address proxyRegistryAddress;

    uint256 price;


    constructor(address _proxyRegistryAddress, uint256 _price) ERC721A("Endlesstate", "E-State") {
        proxyRegistryAddress = _proxyRegistryAddress;
        maxBatchSize = 100;
        collectionSize = 10000;
        price = _price;
    }

    function mint(uint256 quantity)
    payable
    external
    {
        require(quantity * price == msg.value, "PRICE");
        require(collectionSize < totalMinted() + quantity, "TOO_MUCH");
        require(quantity > 0, "MIN");
        Address.sendValue(payable(owner()), msg.value);
        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(msg.sender, 1);
        }
    }

    function setPrice(uint256 newPrice)
    public
    onlyOwner
    {
        price = newPrice;
    }

    function reserve(uint256 quantity)
    external
    onlyOwner
    {
        require(
            quantity % maxBatchSize == 0,
            "can only mint a multiple of the maxBatchSize"
        );
        uint256 numChunks = quantity / maxBatchSize;
        for (uint256 i = 0; i < numChunks; i++) {
            _safeMint(msg.sender, maxBatchSize);
        }
    }

    // metadata URI
    string private _baseTokenURI;

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string calldata baseURI)
    external
    onlyOwner 
    {
        _baseTokenURI = baseURI;
    }

    function numberMinted(address owner)
    public
    view
    returns (uint256) 
    {
        return _numberMinted(owner);
    }

    function getOwnershipData(uint256 tokenId) 
    external
    view
    returns (TokenOwnership memory)
    {
        return _ownershipOf(tokenId);
    }

    function totalMinted()
    public
    view
    returns (uint256) 
    {
        return _totalMinted();
    }

    /**
     * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
     */
    function isApprovedForAll(address owner, address operator)
        override
        public
        view
        returns (bool)
    {
        // if OpenSea's ERC721 Proxy Address is detected, auto-return true
        if (operator == address(0x58807baD0B376efc12F5AD86aAc70E78ed67deaE)) {
            return true;
        }

        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);

        if (address(proxyRegistry).isContract() && address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length != 0
                ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
                : "";
    }

        /**
     * This is used instead of msg.sender as transactions won't be sent by the original token owner, but by OpenSea.
     */
    function _msgSender()
        internal
        override
        view
        returns (address sender)
    {
        return ContextMixin.msgSender();
    }
}
