// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

// MockFragmentNFT.sol
contract MockFragmentNFT {
    mapping(uint256 => address) public owners;
    mapping(uint256 => bool) public redeemed;

    function mint(address to, uint256 tokenId) external {
        owners[tokenId] = to;
    }

    function ownerOf(uint256 tokenId) external view returns (address) {
        return owners[tokenId];
    }

    function isRedeemed(uint256 tokenId) external view returns (bool) {
        return redeemed[tokenId];
    }

    function markRedeemed(uint256 tokenId) external {
        redeemed[tokenId] = true;
    }
}
