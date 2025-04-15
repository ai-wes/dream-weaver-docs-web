// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract DreamEssenceNode is ERC721, ERC2981, Ownable, Pausable {
    using Strings for uint256;

    uint96 private _nextTokenId;
    uint96 public constant MAX_SUPPLY = 10000;
    uint256 public mintPrice = 0.01 ether;  // Default mint price: 0.01 ETH
    
    constructor() 
        ERC721("DreamEssenceNode", "DREAM") 
        Ownable(msg.sender)
    {
        _setDefaultRoyalty(msg.sender, 250); // 2.5% royalty
    }

    // Efficient batch minting
    function mint(uint96 quantity) public payable whenNotPaused {
        require(quantity > 0 && quantity <= 20, "Invalid quantity");
        require(msg.value >= mintPrice * quantity, "Insufficient payment");
        require(_nextTokenId + quantity <= MAX_SUPPLY, "Would exceed max supply");

        uint96 startTokenId = _nextTokenId;
        unchecked {
            for(uint96 i = 0; i < quantity; i++) {
                _safeMint(msg.sender, startTokenId + i);
            }
            _nextTokenId = startTokenId + quantity;
        }
    }

    // Allow owner to withdraw funds
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Transfer failed");
    }

    // Allow owner to update mint price
    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }

    // Emergency pause/unpause
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Required override
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}