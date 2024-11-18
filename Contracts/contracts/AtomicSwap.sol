// contracts/GEHRContract.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract AtomicSwap is Ownable {

    address internal constant BUSD_CONTRACT_MAINNET = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;
    address internal constant BUSD_CONTRACT_TESTNET = 0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee;

    uint32 internal constant ORDER_OPEN = 1;
    uint32 internal constant ORDER_EXECUTED = 2;
    uint32 internal constant ORDER_WITHDRAWL = 3;
    uint32 internal constant ORDER_CANCELED = 4;

    struct BuyOrder {
        string asset;
        address ownerAddr;
        uint32 buyPrice;
        uint32 sellPrice;
        uint256 dollarValue;
        address tokenAddr;
        uint256 tokenValue;
        uint256 exchargeValue;
        uint64 deadline;
        uint32 status;
    }


    BuyOrder[] private _allOrders;
    mapping(address => mapping(uint256 => uint256)) private _orders;
    mapping(address => uint256) private _ordersIndex;
    uint256[] private _openOrders;
    mapping(uint256 => uint256) private _openOrdersIndex;


    address internal _dollarAddress = BUSD_CONTRACT_TESTNET;

    constructor() {
        _allOrders.push(BuyOrder({
            asset: "",
            ownerAddr: address(0),
            buyPrice: 0,
            sellPrice: 0,
            dollarValue: 0,
            tokenAddr: address(0),
            tokenValue: 0,
            exchargeValue: 0,
            deadline: 0,
            status: 0
        }));
    }

    function dollarContract() public view returns (address) {
        return _dollarAddress;
    }

    function setDollarContract(address _address) public onlyOwner {
        _dollarAddress = _address;
    }

    function buyOrder(string memory asset, uint32 buyPrice, uint256 dollarValue, uint64 deadline) public {
        require(_dollarAddress != address(0), "Mint: invalid dollar token");
        ERC20 _dollar = ERC20(_dollarAddress);
        require(_dollar.balanceOf(_msgSender()) >= dollarValue, "Mint: out of balance");
        _dollar.transfer(address(this), dollarValue);
        _allOrders.push(BuyOrder({
            asset: asset,
            ownerAddr: _msgSender(),
            buyPrice: buyPrice,
            sellPrice: 0,
            dollarValue: dollarValue,
            tokenAddr: address(0),
            tokenValue: 0,
            exchargeValue: 0,
            deadline: deadline,
            status: ORDER_OPEN
        }));
        uint256 _length = _ordersIndex[_msgSender()];
        _orders[_msgSender()][_length] = _allOrders.length - 1;
        _ordersIndex[_msgSender()] = _length + 1;
        _openOrders.push(_length + 1);
        _openOrdersIndex[_allOrders.length - 1] = _openOrders.length - 1;
    }

    function sellOrder(string memory asset, uint32 sellPrice, address tokenAddr, uint256 tokenValue, uint64 deadline) public {
        require(tokenAddr != address(0), "Mint: invalid token");
        ERC20 _contract = ERC20(tokenAddr);
        require(_contract.balanceOf(_msgSender()) >= tokenValue, "Mint: out of balance");
        _contract.transfer(address(this), tokenValue);
        _allOrders.push(BuyOrder({
            asset: asset,
            ownerAddr: _msgSender(),
            buyPrice: 0,
            sellPrice: sellPrice,
            dollarValue: 0,
            tokenAddr: tokenAddr,
            tokenValue: tokenValue,
            exchargeValue: 0,
            deadline: deadline,
            status: ORDER_OPEN
        }));
        uint256 _length = _ordersIndex[_msgSender()];
        _orders[_msgSender()][_length] = _allOrders.length - 1;
        _ordersIndex[_msgSender()] = _length + 1;
        _openOrders.push(_length + 1);
        _openOrdersIndex[_allOrders.length - 1] = _openOrders.length - 1;
    }

    function executeBuyOrder(uint256 orderId, address tokenAddr, uint256 tokenValue, uint256 exchargeValue) public onlyOwner  {
        require(orderId < _allOrders.length, "Mint: index out of bounds");
        require(tokenAddr != address(0), "Mint: tokenAddr invalid");

        ERC20 _contract = ERC20(tokenAddr);
        require(_contract.balanceOf(_msgSender()) >= tokenValue, "Mint: out of balance");
        BuyOrder storage b = _allOrders[orderId];

        require(b.status == ORDER_OPEN, "Mint: order is not open");

        uint64 currentDate = uint64(block.timestamp);
        require(b.deadline <= currentDate, "Mint: time is over");

        _contract.transfer(address(this), tokenValue);
        b.tokenAddr = tokenAddr;
        b.tokenValue = tokenValue;
        b.exchargeValue = exchargeValue;
        b.status = ORDER_EXECUTED;
        uint256 _index = _openOrdersIndex[orderId];
        delete _openOrders[_index];
        delete _openOrdersIndex[orderId];
    }

    function executeSellOrder(uint256 orderId, uint256 dollarValue, uint256 exchargeValue) public onlyOwner  {
        require(orderId < _allOrders.length, "Mint: index out of bounds");

        ERC20 _dollar = ERC20(_dollarAddress);
        require(_dollar.balanceOf(_msgSender()) >= dollarValue, "Mint: out of balance");
        BuyOrder storage b = _allOrders[orderId];

        require(b.status == ORDER_OPEN, "Mint: order is not open");

        uint64 currentDate = uint64(block.timestamp);
        require(b.deadline <= currentDate, "Mint: time is over");

        _dollar.transfer(address(this), dollarValue);
        b.dollarValue = dollarValue;
        b.exchargeValue = exchargeValue;
        b.status = ORDER_EXECUTED;

        uint256 _index = _openOrdersIndex[orderId];
        delete _openOrders[_index];
        delete _openOrdersIndex[orderId];
    }

    function withdrawlOrder(uint256 orderId) public {
        require(orderId < _allOrders.length, "Mint: index out of bounds");
        BuyOrder storage b = _allOrders[orderId];
        require(b.ownerAddr > _msgSender(), "Mint: only owner can withdrawl");
        require(b.status == ORDER_EXECUTED, "Mint: order is not executed");

        require(_dollarAddress != address(0), "Mint: invalid dollar token");
        ERC20 _dollar = ERC20(_dollarAddress);
        ERC20 _contract = ERC20(b.tokenAddr);

        if (b.buyPrice > 0) {
            require(_contract.balanceOf(address(this)) >= b.tokenValue, "Mint: out of balance");
            _contract.transfer(_msgSender(), b.tokenValue);
            if (b.exchargeValue > 0) {
                require(_dollar.balanceOf(address(this)) >= b.exchargeValue, "Mint: out of balance");
                _dollar.transfer(_msgSender(), b.exchargeValue);
            }
        }
        else if (b.sellPrice > 0) {
            require(_dollar.balanceOf(address(this)) >= b.dollarValue, "Mint: out of balance");
            _dollar.transfer(_msgSender(), b.dollarValue);
            if (b.exchargeValue > 0) {
                require(_contract.balanceOf(address(this)) >= b.exchargeValue, "Mint: out of balance");
                _contract.transfer(_msgSender(), b.exchargeValue);
            }
        }
        b.status = ORDER_WITHDRAWL;

        uint256 _index = _openOrdersIndex[orderId];
        delete _openOrders[_index];
        delete _openOrdersIndex[orderId];
    }

    function cancelOrder(uint256 orderId) public {
        require(orderId < _allOrders.length, "Mint: index out of bounds");
        BuyOrder storage b = _allOrders[orderId];
        require(b.ownerAddr > _msgSender(), "Mint: only buyer can cancel");

        uint64 currentDate = uint64(block.timestamp);
        require(b.deadline > currentDate, "Mint: time is not over");

        if (b.buyPrice > 0) {
            require(_dollarAddress != address(0), "Mint: invalid dollar token");
            ERC20 _dollar = ERC20(_dollarAddress);
            require(_dollar.balanceOf(address(this)) >= b.dollarValue, "Mint: out of balance");
            _dollar.transfer(b.ownerAddr, b.dollarValue);
        }
        else if (b.sellPrice > 0) {
            ERC20 _contract = ERC20(b.tokenAddr);
            require(_contract.balanceOf(address(this)) >= b.tokenValue, "Mint: out of balance");
            _contract.transfer(_msgSender(), b.tokenValue);
        }
        b.status = ORDER_CANCELED;

        uint256 _index = _openOrdersIndex[orderId];
        delete _openOrders[_index];
        delete _openOrdersIndex[orderId];
    }

    function dollarBalance() public view returns (uint256) {
        require(_dollarAddress != address(0), "Mint: invalid dollar token");
        ERC20 _dollar = ERC20(_dollarAddress);
        return _dollar.balanceOf(address(this));
    }

    function withdrawlDollar(uint256 amount) public onlyOwner {
        require(_dollarAddress != address(0), "Mint: invalid dollar token");
        ERC20 _dollar = ERC20(_dollarAddress);
        require(_dollar.balanceOf(address(this)) >= amount, "Mint: out of balance");
        _dollar.transferFrom(address(this), _msgSender(), amount);
    }

    function tokenBalance(address tokenAddr) public view returns (uint256) {
        require(tokenAddr != address(0), "Mint: invalid token");
        ERC20 _contract = ERC20(tokenAddr);
        return _contract.balanceOf(tokenAddr);
    }

    function withdrawlToken(address tokenAddr, uint256 amount) public onlyOwner {
        require(tokenAddr != address(0), "Mint: invalid token");
        ERC20 _contract = ERC20(tokenAddr);
        require(_contract.balanceOf(address(this)) >= amount, "Mint: out of balance");
        _contract.transferFrom(address(this), _msgSender(), amount);
    }

    function openOrderBalance() public view returns (uint256) {
        return _openOrders.length;
    }

    function openOrderByIndex(uint256 index) public view returns (
        uint256 orderId,
        string memory asset,
        address buyerAddr,
        uint32 buyPrice,
        uint256 dollarValue,
        address tokenAddr,
        uint256 tokenValue,
        uint64 deadline,
        uint32 status
    ) {
        require(index < _openOrders.length, "Mint: open orders index out of bounds");
        uint256 _index = _openOrders[index];
        BuyOrder storage b = _allOrders[_index];

        orderId = _index;
        asset = b.asset;
        buyerAddr = b.ownerAddr;
        buyPrice = b.buyPrice;
        dollarValue = b.dollarValue;
        tokenAddr = b.tokenAddr;
        tokenValue = b.tokenValue;
        deadline = b.deadline;
        status = b.status;
    }

    function orderBalance() public view returns (uint256) {
        return _ordersIndex[_msgSender()];
    }

    function orderByIndex(uint256 index) public view returns (
        uint256 orderId,
        string memory asset,
        address buyerAddr,
        uint32 buyPrice,
        uint256 dollarValue,
        address tokenAddr,
        uint256 tokenValue,
        uint64 deadline,
        uint32 status
    ) {
        uint256 _length = _ordersIndex[_msgSender()];
        require(index < _length, "Mint: operator index out of bounds");
        uint256 _index = _orders[_msgSender()][index];
        BuyOrder storage b = _allOrders[_index];

        orderId = _index;
        asset = b.asset;
        buyerAddr = b.ownerAddr;
        buyPrice = b.buyPrice;
        dollarValue = b.dollarValue;
        tokenAddr = b.tokenAddr;
        tokenValue = b.tokenValue;
        deadline = b.deadline;
        status = b.status;
    }
}
