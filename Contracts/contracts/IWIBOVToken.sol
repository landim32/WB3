// contracts/IGEHRToken.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IWIBOVToken is IERC20 {
    function isWibovToken() external returns (bool);
}