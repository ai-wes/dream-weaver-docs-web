// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;


// MockDreamNFT.sol
contract MockDreamNFT {
    mapping(uint256 => address) public owners;
    mapping(uint256 => uint256) public levels;
    mapping(uint256 => uint256) public cooldowns;

    function mint(address to, uint256 tokenId) external {
        owners[tokenId] = to;
        levels[tokenId] = 0;
    }

    function ownerOf(uint256 tokenId) external view returns (address) {
        address owner = owners[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    function levelUp(uint256 tokenId, string memory) external {
        levels[tokenId]++;
    }

    function dreamLevel(uint256 tokenId) external view returns (uint256) {
        return levels[tokenId];
    }

    function setCooldown(uint256 tokenId, uint256 timestamp) external {
        cooldowns[tokenId] = timestamp;
    }

    function cooldownEnd(uint256 tokenId) external view returns (uint256) {
        return cooldowns[tokenId];
    }
    function setLevel(uint256 tokenId, uint256 level) external {
    levels[tokenId] = level;
}
}
