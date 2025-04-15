// contracts/mocks/DreamWeaverGraphV2Mock.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "../DreamWeaver.sol";

contract DreamWeaverGraphV2Mock is DreamWeaverGraph {
    function getVersion() external pure returns (string memory) {
        return "v2";
    }
}
