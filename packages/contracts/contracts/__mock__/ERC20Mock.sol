//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "hardhat/console.sol";

contract ERC20Mock is ERC20 {
  // solhint-disable-next-line no-empty-blocks
  constructor() ERC20("", "") {}

  function mint(address to, uint256 amount) public {
    _mint(to, amount);
  }
}
