// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;


// MockTimeToken.sol
contract MockTimeToken {
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowances;

    function mint(address to, uint256 amount) external {
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowances[msg.sender][spender] = amount;
        return true;
    }

    function burn(address from, uint256 amount) external {
        require(balances[from] >= amount, "Insufficient balance");
        balances[from] -= amount;
    }
}
