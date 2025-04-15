// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title DreamCoin
 * @notice ERC20 token used as the in-ecosystem currency within the DreamNFT ecosystem.
 *         Uses UUPS upgradeability pattern.
 */
contract DreamCoin is 
    Initializable, 
    ERC20BurnableUpgradeable, 
    OwnableUpgradeable,
    UUPSUpgradeable 
{
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
    
    /**
     * @notice Initializes the contract replacing the constructor
     * @param initialOwner The initial owner of the contract
     */
    function initialize(address initialOwner) public initializer {
        __ERC20_init("DreamCoin", "DREAM");
        __ERC20Burnable_init();
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        
        // Optionally, mint an initial supply to the owner.
        // _mint(initialOwner, 1000000 * 10**decimals());
    }
    
    /**
     * @dev Function that should revert when `msg.sender` is not authorized to upgrade the contract.
     * Called by {upgradeTo} and {upgradeToAndCall}.
     * 
     * This implementation makes it virtual to avoid conflicts with V2 implementations.
     */
    function _authorizeUpgrade(address newImplementation) internal virtual override onlyOwner {}
    
    /**
     * @notice Mint DreamCoins to a specific address. Only callable by the owner.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
