// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract LucidCore is 
    Initializable, 
    ERC721URIStorageUpgradeable, 
    OwnableUpgradeable,
    UUPSUpgradeable 
{
    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public totalMinted;
    
    // Tracks which cores have been redeemed
    mapping(uint256 => bool) private _redeemed;
    
    // Base URI storage
    string private _baseTokenURI;
    
    // Events
    event CoreRedeemed(uint256 indexed tokenId, address indexed owner);
    
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
    
    /**
     * @notice Initializes the contract replacing the constructor
     * @param initialOwner The initial owner of the contract
     */
    function initialize(address initialOwner) public initializer {
        __ERC721URIStorage_init();
        __ERC721_init("Lucid Core", "CORE");
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
    }
    
    /**
     * @dev Function that should revert when `msg.sender` is not authorized to upgrade the contract.
     * Called by {upgradeTo} and {upgradeToAndCall}.
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
    
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    /**
     * @notice Mint a new Lucid Core token
     * @param to Address to mint the token to
     */
    function mintCore(address to) external onlyOwner {
        require(totalMinted < MAX_SUPPLY, "LucidCore: Max supply reached");
        totalMinted++;
        uint256 newTokenId = totalMinted;
        _safeMint(to, newTokenId);
    }
    
    /**
     * @notice Batch mint Lucid Core tokens
     * @param to Address to mint the tokens to
     * @param amount Number of tokens to mint
     */
    function batchMintCore(address to, uint256 amount) external onlyOwner {
        require(totalMinted + amount <= MAX_SUPPLY, "LucidCore: Would exceed max supply");
        for(uint256 i = 0; i < amount; i++) {
            totalMinted++;
            _safeMint(to, totalMinted);
        }
    }
    
    /**
     * @notice Check if a core has been redeemed
     * @param tokenId The token ID to check
     */
    function isRedeemed(uint256 tokenId) external view returns (bool) {
        return _redeemed[tokenId];
    }
    
    /**
     * @notice Mark a core as redeemed. Only callable by owner (Dream Oracle)
     * @param tokenId The token ID to redeem
     */
    function redeemCore(uint256 tokenId) external onlyOwner {
        require(ownerOf(tokenId) != address(0), "LucidCore: Nonexistent token");
        require(!_redeemed[tokenId], "LucidCore: Already redeemed");
        
        _redeemed[tokenId] = true;
        emit CoreRedeemed(tokenId, ownerOf(tokenId));
    }

    function setTokenURI(uint256 tokenId, string memory newTokenURI) external onlyOwner {
        require(ownerOf(tokenId) != address(0), "LucidCore: URI set of nonexistent token");
        _setTokenURI(tokenId, newTokenURI);
    }
    
    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorageUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
