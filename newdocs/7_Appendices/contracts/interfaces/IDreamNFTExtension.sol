// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IDreamNFTExtension
 * @dev Interface for extensions that can be attached to DreamNFT contracts.
 */
interface IDreamNFTExtension {
    /**
     * @dev Initializes the extension, linking it to the main NFT contract.
     * MUST be callable only once.
     * @param _mainNFTAddress The address of the main NFT contract (e.g., DreamNFT).
     */
    function initialize(address _mainNFTAddress) external;

    /**
     * @dev Standard ERC165 supportsInterface function.
     * MUST return true for `type(IDreamNFTExtension).interfaceId`.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
