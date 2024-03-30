// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Staking {
  address public owner;

  struct Position {
    uint256 positionId;
    address walletAddress;
    uint256 createdDate;
    uint256 unlockDate;
    uint256 weiStaked;
    uint256 weiInterest;
    bool open;
  }

  Position position;

  uint256 public currentPositionId;
  mapping(uint256 => Position) public positions;
  mapping(address => uint256[]) public positionIdsByWalletAddress;
  mapping(uint256 => uint256) public tiers;
  uint256[] public lockPeriods;

  constructor() payable {
    owner = msg.sender;
    currentPositionId = 0;

    tiers[0] = 700;
    tiers[30] = 800;
    tiers[60] = 900;
    tiers[90] = 1200;

    lockPeriods.push(0);
    lockPeriods.push(30);
    lockPeriods.push(60);
    lockPeriods.push(90);
  }

  /*
   * @dev Calculate interest based on lock period and wei staked
   * @param {numDays} Lock period in days
   */
  function stakeEther(uint256 numDays) external payable {
    /** If staking period not from lock periods */
    require(tiers[numDays] > 0, "Invalid number of days");

    positions[currentPositionId] = Position(
      currentPositionId,
      msg.sender,
      block.timestamp,
      block.timestamp + (numDays * 1 days),
      msg.value,
      calculateInterest(tiers[numDays], msg.value),
      true
    );

    positionIdsByWalletAddress[msg.sender].push(currentPositionId);
    currentPositionId++;
  }

  /*
   * @dev Withdraw staked ether and interest
   * @param {positionId} Position ID
   * @param {weiAmount} Wei staked
   */
  function calculateInterest(uint256 basisPoints, uint256 weiAmount) internal pure returns (uint256) {
    return (basisPoints * weiAmount) / 10000;
  }

  /** Get the lock periods available */
  function getLockPeriods() external view returns (uint256[] memory) {
    return lockPeriods;
  }

  /** Get the interest rate for each lock period */
  function getInterestRate(uint256 numberOfDays) external view returns (uint256) {
    return tiers[numberOfDays];
  }

  /** Get position by position ID */
  function getPositionById(uint256 positionId) external view returns(Position memory) {
    return positions[positionId];
  }

  /*
   Get all positions created by that address 
   * @param {walletAddress} Wallet address
   * @return positionIdsByWalletAddress Array of position IDs
  */
  function getPositionIdsByAddress(address walletAddress) external view returns(uint256[] memory) {
    return positionIdsByWalletAddress[walletAddress];
  }

  /*
   Remove stake
   * @param {positionId} Position ID
   */
  function closePosition(uint256 positionId) external {
    require(positions[positionId].walletAddress == msg.sender, "You are not the owner of this position");
    require(positions[positionId].open == true, "Position is already closed");

    positions[positionId].open = false;

    uint256 amount = positions[positionId].weiStaked + positions[positionId].weiInterest;
    payable(msg.sender).transfer(amount);
  }

}