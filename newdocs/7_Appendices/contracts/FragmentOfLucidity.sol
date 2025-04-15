// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

interface IFragmentOfLucidity {
    function isRedeemed(uint256 tokenId) external view returns (bool);
    function markRedeemed(uint256 tokenId) external;
    function totalMinted() external view returns (uint256);
}

/**
 * @title FragmentOfLucidity
 * @notice ERC721 contract representing Fragments of Lucidity.
 *         Each fragment can be used (marked as redeemed) in the upgrade process.
 *         Implements ERC2981 to enforce a 6% royalty on secondary sales.
 *         Now uses the UUPS upgradeability pattern.
 */
contract FragmentOfLucidity is 
    Initializable,
    ERC721Upgradeable, 
    OwnableUpgradeable, 
    ERC2981Upgradeable, 
    UUPSUpgradeable,
    IFragmentOfLucidity 
{
    uint256 public constant MAX_FRAGMENT_SUPPLY = 2500;
    uint256 public totalFragmentsMinted;
    bool public ownerFragmentsMinted; // Tracks one-time mint of 50 fragments to owner

    mapping(uint256 => bool) private _redeemed;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @notice Initializes the contract replacing the constructor
     * @param initialOwner The initial owner of the contract who gets royalties
     */
    function initialize(address initialOwner) public initializer {
        __ERC721_init("Fragment of Lucidity", "FOL");
        __Ownable_init(initialOwner);
        __ERC2981_init();
        __UUPSUpgradeable_init();
        
        // Set default royalty to 6% (600 basis points) for the owner
        _setDefaultRoyalty(initialOwner, 600);
    }

    /**
     * @dev Function that should revert when `msg.sender` is not authorized to upgrade the contract.
     * Called by {upgradeTo} and {upgradeToAndCall}.
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    /**
     * @notice Mints a single Fragment to a specified address.
     * @dev Only owner can mint. Ensures total supply does not exceed 2,500.
     */
    function mintFragment(address to) external onlyOwner {
        require(totalFragmentsMinted < MAX_FRAGMENT_SUPPLY, "FRAG: Max supply reached");
        totalFragmentsMinted += 1;
        uint256 newId = totalFragmentsMinted;
        _safeMint(to, newId);
    }

    /**
     * @notice Mints 50 Fragments for giveaways or influencers. Can only be called once.
     */
    function mintOwnerFragmentsOnce() external onlyOwner {
        require(!ownerFragmentsMinted, "FRAG: Already minted 50 to owner");
        // Mint 50 to contract owner
        for (uint256 i = 0; i < 50; i++) {
            require(totalFragmentsMinted < MAX_FRAGMENT_SUPPLY, "FRAG: Max supply reached");
            totalFragmentsMinted++;
            _safeMint(owner(), totalFragmentsMinted);
        }
        ownerFragmentsMinted = true;
    }

    /**
     * @notice Checks if a fragment has been redeemed for an upgrade.
     */
    function isRedeemed(uint256 tokenId) external view override returns (bool) {
        return _redeemed[tokenId];
    }

    /**
     * @notice Marks a fragment as redeemed without burning it.
     */
    function markRedeemed(uint256 tokenId) external override onlyOwner {
        require(tokenId <= totalFragmentsMinted, "FRAG: Nonexistent fragment");
        require(!_redeemed[tokenId], "FRAG: Already redeemed");
        _redeemed[tokenId] = true;
    }

    /**
     * @notice Returns the total minted supply (including redeemed).
     */
    function totalMinted() external view override returns (uint256) {
        return totalFragmentsMinted;
    }

    /**
     * @notice Override supportsInterface to include ERC2981 interface.
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
