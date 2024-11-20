// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.8;

import "@openzeppelin/contracts/access/Ownable.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { Math } from "@openzeppelin/contracts/utils/math/Math.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract OrderBook is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeMath for uint8;
    using Math for uint256;
    using SafeERC20 for IERC20;

    address internal constant BUSD_CONTRACT_MAINNET = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;
    address internal constant BUSD_CONTRACT_TESTNET = 0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee;

    address internal _dollarAddress = BUSD_CONTRACT_TESTNET;

    struct Order {
        address maker;
        uint256 amount;
    }

    struct Step {
        uint256 higherPrice;
        uint256 lowerPrice;
        uint256 amount;
    }

    event PlaceBuyOrder(address sender, address tokenAddr, uint256 price, uint256 amountDollar);
    event PlaceSellOrder(address sender, address tokenAddr, uint256 price, uint256 amountToken);
    event DrawToBuyBook(address sender, address tokenAddr, uint256 price, uint256 amountDollar);
    event DrawToSellBook(address sender, address tokenAddr, uint256 price, uint256 amountToken);

    //IERC20 public tradeToken;
    IERC20 public _dollar;

    mapping(address => mapping(uint256 => mapping(uint8 => Order))) public _buyOrdersInStep;
    mapping(address => mapping(uint256 => Step)) public _buySteps;
    mapping(address => mapping(uint256 => uint8)) public _buyOrdersInStepCounter;
    mapping(address => uint256) public _maxBuyPrice;

    mapping(address => mapping(uint256 => mapping(uint8 => Order))) public _sellOrdersInStep;
    mapping(address => mapping(uint256 => Step)) public _sellSteps;
    mapping(address => mapping(uint256 => uint8)) public _sellOrdersInStepCounter;
    mapping(address => uint256) public _minSellPrice;

    /**
     * @notice Constructor
     */
    constructor() {
        _dollar = IERC20(_dollarAddress);
    }

    function dollarContract() public view returns (address) {
        return _dollarAddress;
    }

    function setDollarContract(address _address) public onlyOwner {
        _dollarAddress = _address;
        _dollar = IERC20(_dollarAddress);
    }

    /**
     * @notice Place buy order.
     */
    function placeBuyOrder (
        address tokenAddr,
        uint256 price,
        uint256 amountDollar
    ) external nonReentrant {
        _dollar.safeTransferFrom(_msgSender(), address(this), amountDollar);
        emit PlaceBuyOrder(_msgSender(), tokenAddr, price, amountDollar);

        /**
         * @notice if has order in sell book, and price >= min sell price
         */
        uint256 sellPricePointer = _minSellPrice[tokenAddr];
        uint256 amountReflect = amountDollar;
        if (_minSellPrice[tokenAddr] > 0 && price >= _minSellPrice[tokenAddr]) {
            while (amountReflect > 0 && sellPricePointer <= price && sellPricePointer != 0) {
                uint8 i = 1;
                uint256 higherPrice = _sellSteps[tokenAddr][sellPricePointer].higherPrice;
                while (i <= _sellOrdersInStepCounter[tokenAddr][sellPricePointer] && amountReflect > 0) {
                    if (amountReflect >= _sellOrdersInStep[tokenAddr][sellPricePointer][i].amount) {
                        //if the last order has been matched, delete the step
                        if (i == _sellOrdersInStepCounter[tokenAddr][sellPricePointer]) {
                            if (higherPrice > 0)
                            _sellSteps[tokenAddr][higherPrice].lowerPrice = 0;
                            delete _sellSteps[tokenAddr][sellPricePointer];
                            _minSellPrice[tokenAddr] = higherPrice;
                        }

                        amountReflect = amountReflect.sub(_sellOrdersInStep[tokenAddr][sellPricePointer][i].amount);

                        // delete order from storage
                        delete _sellOrdersInStep[tokenAddr][sellPricePointer][i];
                        _sellOrdersInStepCounter[tokenAddr][sellPricePointer] -= 1;
                    } else {
                        _sellSteps[tokenAddr][sellPricePointer].amount = _sellSteps[tokenAddr][sellPricePointer].amount.sub(amountReflect);
                        _sellOrdersInStep[tokenAddr][sellPricePointer][i].amount = _sellOrdersInStep[tokenAddr][sellPricePointer][i].amount.sub(amountReflect);
                        amountReflect = 0;
                    }
                    i += 1;
                }
                sellPricePointer = higherPrice;
            }
        }
        /**
         * @notice draw to buy book the rest
         */
        if (amountReflect > 0) {
            _drawToBuyBook(tokenAddr, price, amountReflect);
        }
    }

    /**
     * @notice Place buy order.
     */
    function placeSellOrder (
        address tokenAddr,
        uint256 price,
        uint256 amountToken
    ) external nonReentrant {
        require(tokenAddr != address(0), "OrderBook: token address cant be empty");
        IERC20 _contract = IERC20(tokenAddr);
        _contract.safeTransferFrom(_msgSender(), address(this), amountToken);
        emit PlaceSellOrder(_msgSender(), tokenAddr, price, amountToken);

        /**
         * @notice if has order in buy book, and price <= max buy price
         */
        uint256 buyPricePointer = _maxBuyPrice[tokenAddr];
        uint256 amountReflect = amountToken;
        if (_maxBuyPrice[tokenAddr] > 0 && price <= _maxBuyPrice[tokenAddr]) {
            while (amountReflect > 0 && buyPricePointer >= price && buyPricePointer != 0) {
                uint8 i = 1;
                uint256 lowerPrice = _buySteps[tokenAddr][buyPricePointer].lowerPrice;
                while (i <= _buyOrdersInStepCounter[tokenAddr][buyPricePointer] && amountReflect > 0) {
                    if (amountReflect >= _buyOrdersInStep[tokenAddr][buyPricePointer][i].amount) {
                        //if the last order has been matched, delete the step
                        if (i == _buyOrdersInStepCounter[tokenAddr][buyPricePointer]) {
                            if (lowerPrice > 0)
                            _buySteps[tokenAddr][lowerPrice].higherPrice = 0;
                            delete _buySteps[tokenAddr][buyPricePointer];
                            _maxBuyPrice[tokenAddr] = lowerPrice;
                        }

                        amountReflect = amountReflect.sub(_buyOrdersInStep[tokenAddr][buyPricePointer][i].amount);

                        // delete order from storage
                        delete _buyOrdersInStep[tokenAddr][buyPricePointer][i];
                        _buyOrdersInStepCounter[tokenAddr][buyPricePointer] -= 1;
                    } else {
                        _buySteps[tokenAddr][buyPricePointer].amount = _buySteps[tokenAddr][buyPricePointer].amount.sub(amountReflect);
                        _buyOrdersInStep[tokenAddr][buyPricePointer][i].amount = _buyOrdersInStep[tokenAddr][buyPricePointer][i].amount.sub(amountReflect);
                        amountReflect = 0;
                    }
                    i += 1;
                }
                buyPricePointer = lowerPrice;
            }
        }
        /**
         * @notice draw to buy book the rest
         */
        if (amountReflect > 0) {
            _drawToSellBook(tokenAddr, price, amountReflect);
        }
    }

    /**
     * @notice draw buy order.
     */
    function _drawToBuyBook (
        address tokenAddr,
        uint256 price,
        uint256 amount
    ) internal {
        require(price > 0, "Can not place order with price equal 0");

        _buyOrdersInStepCounter[tokenAddr][price] += 1;
        _buyOrdersInStep[tokenAddr][price][_buyOrdersInStepCounter[tokenAddr][price]] = Order(msg.sender, amount);
        _buySteps[tokenAddr][price].amount = _buySteps[tokenAddr][price].amount.add(amount);
        emit DrawToBuyBook(_msgSender(), tokenAddr, price, amount);

        if (_maxBuyPrice[tokenAddr] == 0) {
            _maxBuyPrice[tokenAddr] = price;
            return;
        }

        if (price > _maxBuyPrice[tokenAddr]) {
            _buySteps[tokenAddr][_maxBuyPrice[tokenAddr]].higherPrice = price;
            _buySteps[tokenAddr][price].lowerPrice = _maxBuyPrice[tokenAddr];
            _maxBuyPrice[tokenAddr] = price;
            return;
        }

        if (price == _maxBuyPrice[tokenAddr]) {
            return;
        }

        uint256 buyPricePointer = _maxBuyPrice[tokenAddr];
        while (price <= buyPricePointer) {
            buyPricePointer = _buySteps[tokenAddr][buyPricePointer].lowerPrice;
        }

        if (price < _buySteps[tokenAddr][buyPricePointer].higherPrice) {
            _buySteps[tokenAddr][price].higherPrice = _buySteps[tokenAddr][buyPricePointer].higherPrice;
            _buySteps[tokenAddr][price].lowerPrice = buyPricePointer;

            _buySteps[tokenAddr][_buySteps[tokenAddr][buyPricePointer].higherPrice].lowerPrice = price;
            _buySteps[tokenAddr][buyPricePointer].higherPrice = price;
        }
    }

    /**
     * @notice draw sell order.
     */
    function _drawToSellBook (
        address tokenAddr,
        uint256 price,
        uint256 amount
    ) internal {
        require(price > 0, "Can not place order with price equal 0");

        _sellOrdersInStepCounter[tokenAddr][price] += 1;
        _sellOrdersInStep[tokenAddr][price][_sellOrdersInStepCounter[tokenAddr][price]] = Order(msg.sender, amount);
        _sellSteps[tokenAddr][price].amount += amount;
        emit DrawToSellBook(_msgSender(), tokenAddr, price, amount);

        if (_minSellPrice[tokenAddr] == 0) {
            _minSellPrice[tokenAddr] = price;
            return;
        }

        if (price < _minSellPrice[tokenAddr]) {
            _sellSteps[tokenAddr][_minSellPrice[tokenAddr]].lowerPrice = price;
            _sellSteps[tokenAddr][price].higherPrice = _minSellPrice[tokenAddr];
            _minSellPrice[tokenAddr] = price;
            return;
        }

        if (price == _minSellPrice[tokenAddr]) {
            return;
        }

        uint256 sellPricePointer = _minSellPrice[tokenAddr];
        while (price >= sellPricePointer && _sellSteps[tokenAddr][sellPricePointer].higherPrice != 0) {
            sellPricePointer = _sellSteps[tokenAddr][sellPricePointer].higherPrice;
        }

        if (sellPricePointer < price) {
            _sellSteps[tokenAddr][price].lowerPrice = sellPricePointer;
            _sellSteps[tokenAddr][sellPricePointer].higherPrice = price;
        }

        if (sellPricePointer > price && price > _sellSteps[tokenAddr][sellPricePointer].lowerPrice) {
            _sellSteps[tokenAddr][price].lowerPrice = _sellSteps[tokenAddr][sellPricePointer].lowerPrice;
            _sellSteps[tokenAddr][price].higherPrice = sellPricePointer;

            _sellSteps[tokenAddr][_sellSteps[tokenAddr][sellPricePointer].lowerPrice].higherPrice = price;
            _sellSteps[tokenAddr][sellPricePointer].lowerPrice = price;
        }
    }
    
}