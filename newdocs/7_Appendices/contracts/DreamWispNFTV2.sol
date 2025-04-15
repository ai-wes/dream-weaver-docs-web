// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "./DreamWisps.sol";

/**
 * @title DreamWispNFTV2
 * @dev Enhanced version of DreamWispNFT with premium features
 * This contract demonstrates how to upgrade the existing DreamWispNFT contract
 * while maintaining all of its functionality and adding new features
 */
contract DreamWispNFTV2 is DreamWispNFT {
    // Mapping from token ID to premium status
    mapping(uint256 => bool) private _premiumTokens;
    
    // Additional royalty percentage for premium tokens (on top of base royalty)
    uint256 private _premiumRoyaltyBps;
    
    // Event emitted when premium status changes
    event PremiumStatusChanged(uint256 indexed tokenId, bool isPremium);
    
    // Event emitted when premium royalty percentage changes
    event PremiumRoyaltyChanged(uint256 previousBps, uint256 newBps);
    
    /**
     * @dev Returns the version of the contract
     * This is a new function added in V2
     */
    function version() public pure returns (string memory) {
        return "2.0.0";
    }
    
    /**
     * @dev Set premium status for a token
     * @param tokenId ID of the token
     * @param status Premium status to set
     * 
     * Requirements:
     * - Caller must be the owner or approved for all tokens
     * - The token must exist
     */
    function setPremiumStatus(uint256 tokenId, bool status) public {
        // Check if token exists by trying to access owner (will revert if doesn't exist)
        address owner = ownerOf(tokenId);
        require(
            owner == _msgSender() || 
            getApproved(tokenId) == _msgSender() || 
            isApprovedForAll(owner, _msgSender()),
            "DreamWispNFTV2: caller is not owner nor approved"
        );
        
        _premiumTokens[tokenId] = status;
        emit PremiumStatusChanged(tokenId, status);
    }
    
    /**
     * @dev Check if a token is premium
     * @param tokenId ID of the token
     * @return bool True if the token is premium
     * 
     * Requirements:
     * - The token must exist
     */
    function isPremium(uint256 tokenId) public view returns (bool) {
        // This will revert if token doesn't exist
        ownerOf(tokenId);
        return _premiumTokens[tokenId];
    }
    
    /**
     * @dev Set premium royalty percentage
     * @param bps Basis points for premium royalty (100 = 1%)
     * 
     * Requirements:
     * - Caller must be the creator or contract owner
     * - Premium royalty cannot exceed 5000 bps (50%)
     */
    function setPremiumRoyaltyBps(uint256 bps) public {
        require(_msgSender() == creator || _msgSender() == owner(), "DreamWispNFTV2: caller is not creator or owner");
        require(bps <= 5000, "DreamWispNFTV2: premium royalty cannot exceed 50%");
        
        uint256 previousBps = _premiumRoyaltyBps;
        _premiumRoyaltyBps = bps;
        emit PremiumRoyaltyChanged(previousBps, bps);
    }
    
    /**
     * @dev Get premium royalty percentage
     * @return uint256 Premium royalty in basis points
     */
    function getPremiumRoyaltyBps() public view returns (uint256) {
        return _premiumRoyaltyBps;
    }
    
    /**
     * @dev Override the royaltyInfo function to include premium royalty
     * @param tokenId ID of the token
     * @param salePrice Sale price of the token
     * @return receiver Address of the royalty receiver
     * @return royaltyAmount Amount of royalty to be paid
     */
    function royaltyInfo(uint256 tokenId, uint256 salePrice) public view returns (address receiver, uint256 royaltyAmount) {
        // This will revert if token doesn't exist
        ownerOf(tokenId);
        
        // Get creator as royalty receiver
        address baseReceiver = creator;
        
        // Calculate base royalty (e.g., 5%)
        uint256 baseRoyalty = (salePrice * 500) / 10000;
        
        // If the token is premium, add premium royalty
        if (_premiumTokens[tokenId]) {
            uint256 premiumRoyalty = (salePrice * _premiumRoyaltyBps) / 10000;
            return (baseReceiver, baseRoyalty + premiumRoyalty);
        }
        
        return (baseReceiver, baseRoyalty);
    }
    
    /**
     * @dev Override the token URI to include premium status
     * @param tokenId ID of the token
     * @return string URI for the token metadata
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        string memory baseURI = super.tokenURI(tokenId);
        
        // If the token is premium, add premium indicator to the URI
        if (_premiumTokens[tokenId]) {
            return string(abi.encodePacked(baseURI, "?premium=true"));
        }
        
        return baseURI;
    }
    
    /**
     * @dev Function to mint a premium token in one transaction
     * @param to Address to mint the token to
     * @return uint256 ID of the minted token
     */
    function mintPremium(address to) public returns (uint256) {
        require(_msgSender() == creator || _msgSender() == owner(), "DreamWispNFTV2: caller is not creator or owner");
        
        uint256 tokenId = mint(to);
        _premiumTokens[tokenId] = true;
        emit PremiumStatusChanged(tokenId, true);
        
        return tokenId;
    }
    
    /**
     * @dev Get count of premium tokens
     * @return uint256 Number of premium tokens
     */
    function premiumTokenCount() public view returns (uint256) {
        uint256 count = 0;
        
        for (uint256 i = 0; i < tokenCounter; i++) {
            if (_premiumTokens[i]) {
                count++;
            }
        }
        
        return count;
    }
    
    /**
     * @dev Function to authorize an upgrade to this contract
     * @param newImplementation Address of the new implementation
     * 
     * Requirements:
     * - Can only be called by the current owner
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {
        // This function is required by the UUPS pattern
        // No additional checks needed as we're enforcing onlyOwner
    }
} 