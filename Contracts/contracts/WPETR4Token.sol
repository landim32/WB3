// contracts/GobiToken.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;

import "./IWIBOVToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract WPETR4Token is ERC20, IWIBOVToken, Ownable {

    uint256 private _maxSupply;

    constructor() ERC20("Wrapped Petrobras", "WPETR4") {
        //_mint(msg.sender, 100000 * (10 ** decimals())); // 100k
        _maxSupply = 100000000 * (10 ** decimals()); // 100 millions
    }

    function maxSupply() public view returns (uint256) {
        return _maxSupply;
    }

    function mint(uint256 amount) public onlyOwner returns (bool)  {
        //console.log("doing mint");
        //console.log("%s + %s <= %s", totalSupply(), amount, _maxSupply);
        require((totalSupply() + amount <= _maxSupply), "WPETR4: cannot mint more that max supply");
        _mint(_msgSender(), amount);
        return true;
    }

    function burn(uint256 amount) public onlyOwner {
        //console.log("owner=%s, amount=%s", _owner, amount);
        require(_msgSender() != address(0), "WPETR4: need burn from a owner");
        uint256 _balance = balanceOf(_msgSender());
        require(_balance >= amount, "WPETR4: burn amount exceeds balance");
        //console.log("balance=%s >= amount=%s", _balance, amount);
        _burn(_msgSender(), amount);
        _maxSupply -= amount;
        //console.log("newMaxSupply=%s", _maxSupply);
    }

    function isWibovToken() public override pure returns (bool) {
        return true;
    }
}