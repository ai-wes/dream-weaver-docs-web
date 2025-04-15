// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// Implement all IERC721 functions needed by DreamWeaverGraph
contract MockLucidCore is IERC721 {
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    
    // IERC721 implementation
    function balanceOf(address owner) external view override returns (uint256) {
        return _balances[owner];
    }
    
    function ownerOf(uint256 tokenId) external view override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "MockLucidCore: owner query for nonexistent token");
        return owner;
    }
    
    function mint(address to, uint256 tokenId) external {
        require(_owners[tokenId] == address(0), "MockLucidCore: token already minted");
        _owners[tokenId] = to;
        _balances[to] += 1;
    }
    
    function burn(uint256 tokenId) external {
        address owner = _owners[tokenId];
        require(owner != address(0), "MockLucidCore: token does not exist");
        _balances[owner] -= 1;
        delete _owners[tokenId];
    }
    
    // Required IERC721 methods
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory /* data */) external override {
        transferFrom(from, to, tokenId);
    }
    
    function safeTransferFrom(address from, address to, uint256 tokenId) external override {
        transferFrom(from, to, tokenId);
    }
    
    function transferFrom(address from, address to, uint256 tokenId) public override {
        require(_owners[tokenId] == from, "MockLucidCore: transfer from incorrect owner");
        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;
    }
    
    function approve(address to, uint256 tokenId) external override {}
    function getApproved(uint256 /* tokenId */) external pure override returns (address) { return address(0); }
    function setApprovalForAll(address operator, bool approved) external override {}
    function isApprovedForAll(address /* owner */, address /* operator */) external pure override returns (bool) { return false; }
    
    // IERC165 implementation
    function supportsInterface(bytes4 /* interfaceId */) external pure override returns (bool) {
        return false;
    }
}
