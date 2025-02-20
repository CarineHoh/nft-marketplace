// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ArtMarketplace is ERC721, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Royalty percentage (in basis points, 100 = 1%)
    uint256 public constant ROYALTY_PERCENTAGE = 250; // 2.5%
    
    struct Artwork {
        uint256 id;
        address artist;
        uint256 price;
        string ipfsHash;
        bool isForSale;
        string title;
        string description;
    }
    
    // Mapping from token ID to Artwork
    mapping(uint256 => Artwork) public artworks;
    mapping(uint256 => address) public artistRoyalties;
    
    // Events
    event ArtworkCreated(uint256 indexed tokenId, address artist, string ipfsHash, uint256 price);
    event ArtworkSold(uint256 indexed tokenId, address seller, address buyer, uint256 price);
    event PriceUpdated(uint256 indexed tokenId, uint256 newPrice);
    
    constructor() ERC721("Digital Art", "DART") {}
    
    function createArtwork(
        string memory ipfsHash,
        uint256 price,
        string memory title,
        string memory description
    ) public returns (uint256) {
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(price > 0, "Price must be greater than 0");
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _mint(msg.sender, newItemId);
        
        artworks[newItemId] = Artwork(
            newItemId,
            msg.sender,
            price,
            ipfsHash,
            true,
            title,
            description
        );
        
        artistRoyalties[newItemId] = msg.sender;
        
        emit ArtworkCreated(newItemId, msg.sender, ipfsHash, price);
        
        return newItemId;
    }
    
    function buyArtwork(uint256 tokenId) public payable nonReentrant {
        Artwork storage artwork = artworks[tokenId];
        require(artwork.isForSale, "Artwork is not for sale");
        require(msg.value >= artwork.price, "Insufficient payment");
        
        address seller = ownerOf(tokenId);
        address artist = artistRoyalties[tokenId];
        
        // Calculate royalty
        uint256 royaltyAmount = (msg.value * ROYALTY_PERCENTAGE) / 10000;
        uint256 sellerAmount = msg.value - royaltyAmount;
        
        // Transfer ownership
        _transfer(seller, msg.sender, tokenId);
        
        // Transfer payments
        if (royaltyAmount > 0 && artist != seller) {
            payable(artist).transfer(royaltyAmount);
        }
        payable(seller).transfer(sellerAmount);
        
        // Update artwork status
        artwork.isForSale = false;
        
        emit ArtworkSold(tokenId, seller, msg.sender, msg.value);
    }
    
    function updatePrice(uint256 tokenId, uint256 newPrice) public {
        require(_exists(tokenId), "Artwork does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(newPrice > 0, "Price must be greater than 0");
        
        artworks[tokenId].price = newPrice;
        artworks[tokenId].isForSale = true;
        
        emit PriceUpdated(tokenId, newPrice);
    }
    
    function getArtwork(uint256 tokenId) public view returns (Artwork memory) {
        require(_exists(tokenId), "Artwork does not exist");
        return artworks[tokenId];
    }
}