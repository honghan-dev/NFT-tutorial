// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

// Uncomment this line to use console.log
import "hardhat/console.sol";

import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IERC20} from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

contract MarketInteractions {
    // State variables
    address payable owner;

    // Aave V3 Pool and Addresses Provider interfaces
    IPoolAddressesProvider public immutable ADDRESSES_PROVIDER;
    IPool public immutable POOL;

    // LINK token contract address and interface
    address private immutable LINK_ADDRESS =
        0x07C725d58437504CA5f814AE406e70E21C5e8e9e;
    IERC20 private link;

    // Constructor
    constructor(address _addressProvider) {
        owner = payable(msg.sender);
        ADDRESSES_PROVIDER = IPoolAddressesProvider(_addressProvider);
        POOL = IPool(ADDRESSES_PROVIDER.getPool());
        link = IERC20(LINK_ADDRESS);
    }

    // Supply liquidity to the Aave V3 Pool
    function supplyLiquidity(address _tokenAddress, uint256 _amount) external {
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address onBehalfOf = address(this);
        uint16 referralCode = 0;

        POOL.supply(asset, amount, onBehalfOf, referralCode);
    }

    // Withdraw liquidity from the Aave V3 Pool
    function withdrawLiquidity(
        address _tokenAddress,
        uint256 _amount
    ) external returns (uint256) {
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address to = address(this);

        return POOL.withdraw(asset, amount, to);
    }

    // Get user account data from the Aave V3 Pool
    function getUserAccountData(
        address _userAddress
    )
        external
        view
        returns (
            uint256 totalCollateralBase,
            uint256 totalDebtBase,
            uint256 availableBorrowsBase,
            uint256 currentLiquidationThreshold,
            uint256 ltv,
            uint256 healthFactor
        )
    {
        return POOL.getUserAccountData(_userAddress);
    }

    // Approve the LINK token for use with the Aave V3 Pool
    function approveLink(
        uint256 _amount,
        address _poolContractAddress
    ) external returns (bool) {
        return link.approve(_poolContractAddress, _amount);
    }

    // Get the allowance of the LINK token for use with the Aave V3 Pool
    function allowanceLINK(
        address _poolContractAddress
    ) external view returns (uint256) {
        return link.allowance(address(this), _poolContractAddress);
    }

    // Get the balance of a token held by this contract
    function getBalance(address _tokenAddress) external view returns (uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }

    // Withdraw tokens held by this contract
    function withdraw(address _tokenAddress) external onlyOwner {
        IERC20 token = IERC20(_tokenAddress);
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }

    receive() external payable {}
}
