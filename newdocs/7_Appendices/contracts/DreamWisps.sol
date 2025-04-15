// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract DreamWispNFT is 
    Initializable, 
    ERC721Upgradeable, 
    OwnableUpgradeable,
    UUPSUpgradeable
{
    uint256 public tokenCounter;
    address public creator;
    mapping(uint256 => address) public coreBinding; // Links wisp NFT to Lucid Core

    // Add a receive function to accept ETH payments
    receive() external payable {}

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @notice Initializes the contract replacing the constructor
     * @param initialOwner The initial owner and creator of the contract
     */
    function initialize(address initialOwner) public initializer {
        __ERC721_init("DreamWisp", "DWISP");
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        
        creator = initialOwner;
        tokenCounter = 0;
    }

    /**
     * @dev Function that should revert when `msg.sender` is not authorized to upgrade the contract.
     * Called by {upgradeTo} and {upgradeToAndCall}.
     */
    function _authorizeUpgrade(address newImplementation) internal virtual override onlyOwner {}

    function mint(address lucidCore) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(lucidCore, newTokenId);
        coreBinding[newTokenId] = lucidCore;
        tokenCounter += 1;
        return newTokenId;
    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        super.transferFrom(from, to, tokenId);
        uint256 royalty = (5 * getPrice(tokenId)) / 100; // 5% royalty
        payable(creator).transfer(royalty);
        coreBinding[tokenId] = to; // Update binding upon transfer
    }

    function getPrice(uint256 /* tokenId */) internal pure returns (uint256) {
        return 0.1 ether; // Placeholder price function
    }
}
