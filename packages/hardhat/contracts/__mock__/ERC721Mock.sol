//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ERC721Mock is ERC721 {
  // solhint-disable-next-line no-empty-blocks
  constructor() ERC721("", "") {}

  function mint(address to, uint256 tokenId) public {
    _mint(to, tokenId);
  }
}
