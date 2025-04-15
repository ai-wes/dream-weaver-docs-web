// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title DreamEssenceNodeUpgradeable
 * @dev Upgradeable version of DreamEssenceNode NFT contract with UUPS proxy pattern
 */
contract DreamEssenceNodeUpgradeable is 
    Initializable, 
    ERC721Upgradeable, 
    ERC2981Upgradeable, 
    OwnableUpgradeable, 
    PausableUpgradeable,
    UUPSUpgradeable
{
    // using StringsUpgradeable for uint256; // Removed as it's unused

    uint96 private _nextTokenId;
    uint96 public constant MAX_SUPPLY = 10000;
    uint256 public mintPrice;  // Mint price in ETH
    
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
    
    /**
     * @dev Initializes the contract replacing the constructor
     * @param initialOwner The initial owner of the contract.
     */
    function initialize(address initialOwner) public initializer {
        __ERC721_init("DreamEssenceNode", "DEN"); // Changed symbol to DEN
        __ERC2981_init();
        __Ownable_init(initialOwner);
        __Pausable_init();
        __UUPSUpgradeable_init();
        
        _setDefaultRoyalty(initialOwner, 250); // 2.5% royalty
        mintPrice = 0.01 ether;  // Default mint price: 0.01 ETH
    }
    
    /**
     * @dev Authorizes contract upgrade through the UUPS proxy pattern
     * Only callable by the owner
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    /**
     * @dev Mint a batch of NFTs
     * @param quantity Number of NFTs to mint (max 20)
     */
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

    /**
     * @dev Allow owner to withdraw contract funds
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Transfer failed");
    }

    /**
     * @dev Allow owner to update the mint price
     * @param newPrice New mint price in wei
     */
    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }

    /**
     * @dev Emergency pause function
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause the contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev IERC165 override for ERC721 and ERC2981 compatibility
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Upgradeable, ERC2981Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
