//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage {

    using Counters for Counters.Counter;

    //Number to keep track of minted nfts
    Counters.Counter private _tokenIds;

    //Number of items sold on the marketplace
    Counters.Counter private _soldItems;

    address payable owner;
    
    //Listing fee to list an nft on the marketplace
    uint256 listFee = 0.01 ether;

    //The structure to store info about a listed token
    struct ListedToken {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
    }

    //The event emitted when a token is successfully listed
    event TokenListedSuccess (
        uint256 indexed tokenId,
        address owner,
        address seller,
        uint256 price,
    );

    //This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => ListedToken) private ListedTokens;

    constructor() ERC721("ArtsOnChain", "AOC") {
        owner = payable(msg.sender);
    }

    //Update listing fee
    function updateListingFee () public {

    }

    
}