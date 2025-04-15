// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/// @title DreamTimeToken
/// @notice ERC20 utility token used to reduce DreamNFT upgrade cooldowns. Each token reduces cooldown by 1 hour.
contract DreamTimeToken is 
    Initializable, 
    ERC20Upgradeable, 
    OwnableUpgradeable,
    UUPSUpgradeable 
{
    // Approved game contracts that are allowed to mint/burn tokens.
    mapping(address => bool) public gameContracts;

    event GameContractStatusChanged(address indexed contractAddress, bool status);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @dev Initializer that replaces the constructor
     * @param initialOwner The initial owner of the contract
     */
    function initialize(address initialOwner) public initializer {
        __ERC20_init("Time Token", "TT");
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        
        // Mint 1000 tokens (plus decimals) to the owner
        _mint(initialOwner, 1000 * 10**decimals());
    }

    /**
     * @dev Function that should revert when `msg.sender` is not authorized to upgrade the contract.
     */
    function _authorizeUpgrade(address newImplementation) internal virtual override onlyOwner {}

    modifier onlyGameContracts() {
        require(gameContracts[msg.sender], "DreamTimeToken: Not authorized");
        _;
    }

    /**
     * @notice Mint Time Tokens to a specific address. Callable only by approved game contracts.
     */
    function mint(address to, uint256 amount) external onlyGameContracts {
        _mint(to, amount);
    }

    /**
     * @notice Burn Time Tokens from a specific address. Callable only by approved game contracts.
     */
    function burn(address from, uint256 amount) external onlyGameContracts {
        _burn(from, amount);
    }

    /**
     * @notice Set or unset a game contract's approval status for mint/burn privileges.
     * @param contractAddress The address of the game contract.
     * @param status True to approve, False to revoke.
     */
    function setGameContract(address contractAddress, bool status) external onlyOwner {
        require(contractAddress != address(0), "DreamTimeToken: Zero address not allowed");
        gameContracts[contractAddress] = status;
        emit GameContractStatusChanged(contractAddress, status);
    }
}
