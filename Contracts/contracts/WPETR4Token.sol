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

    function _transfer(address from, address to, uint256 amount) internal override {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        uint256 fromBalance = balanceOf(_msgSender());
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");

        uint256 _amount = amount;
        uint256 _fee = ((amount * 2) / 1000);
        if (owner() != address(0)) {
            _amount -= _fee;
            super._transfer(from, owner(), _fee);
        }

        super._transfer(from, to, _amount);
    }

    function isWibovToken() public override pure returns (bool) {
        return true;
    }
}