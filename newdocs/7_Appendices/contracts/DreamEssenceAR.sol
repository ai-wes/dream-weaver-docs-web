// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol"; // Keep non-upgradeable for interface
import "./interfaces/IDreamNFTExtension.sol";

/**
 * @title DreamNFTExtensionAR
 * @dev Upgradeable extension for DreamNFT providing AR metadata features.
 */
contract DreamNFTExtensionAR is 
    Initializable, 
    IDreamNFTExtension, 
    OwnableUpgradeable, 
    UUPSUpgradeable,
    ERC165Upgradeable
{
    // Address of the main DreamNFT contract this extension is linked to
    address public dreamNFTAddress; 
    
    struct ARMetadata {
        bool hasHoloEffect;
        string arUri;
        string holoType;
        uint256 unlockTime;
    }
    
    mapping(uint256 => ARMetadata) public arMetadata;
    mapping(uint256 => bool) public arUnlocked;
    
    event ARUnlocked(uint256 indexed tokenId, string arUri);
    event HoloEffectAdded(uint256 indexed tokenId, string holoType);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @dev Initializes the contract, linking it to the main DreamNFT contract.
     * Replaces the constructor in the upgradeable pattern.
     * @param _mainNFTAddress The address of the DreamNFT contract.
     */
    function initialize(address _mainNFTAddress) public override initializer {
        require(_mainNFTAddress != address(0), "AR: Zero address");
        __Ownable_init(msg.sender); // Initialize Ownable
         // Ensure owner is correctly set.
        _transferOwnership(_msgSender());
        __UUPSUpgradeable_init(); // Initialize UUPS
        __ERC165_init(); // Initialize ERC165

        dreamNFTAddress = _mainNFTAddress; // Set the linked NFT contract
    }

    /**
     * @dev Authorizes contract upgrade through the UUPS proxy pattern.
     * Only callable by the owner.
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    /**
     * @dev Sets AR metadata for a specific DreamNFT token. Only owner can call.
     * @param tokenId The ID of the DreamNFT token.
     * @param arUri The URI for the AR experience.
     * @param holoType The type descriptor for the holo effect.
     */
    function setARMetadata(
        uint256 tokenId,
        string memory arUri,
        string memory holoType
    ) external onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        
        arMetadata[tokenId] = ARMetadata({
            hasHoloEffect: true,
            arUri: arUri,
            holoType: holoType,
            unlockTime: block.timestamp
        });
        
        emit HoloEffectAdded(tokenId, holoType);
    }
    
    function unlockAR(uint256 tokenId) external {
        require(_exists(tokenId), "AR: Token does not exist");
        require(IERC721(dreamNFTAddress).ownerOf(tokenId) == msg.sender, "AR: Not token owner");
        require(!arUnlocked[tokenId], "AR: Already unlocked");

        arUnlocked[tokenId] = true;
        emit ARUnlocked(tokenId, arMetadata[tokenId].arUri);
    }
    
    function _exists(uint256 tokenId) internal view returns (bool) {
        // Modified implementation to ensure proper error propagation
        try IERC721(dreamNFTAddress).ownerOf(tokenId) returns (address) {
            return true;
        } catch Error(string memory) {
            return false;
        } catch {
            return false;
        }
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     * Includes support for IDreamNFTExtension and standard ERC165.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(IDreamNFTExtension, ERC165Upgradeable) returns (bool) {
        // Explicitly check the interfaces this contract and its relevant bases support
        return interfaceId == type(IDreamNFTExtension).interfaceId || 
               super.supportsInterface(interfaceId);
    }
}
