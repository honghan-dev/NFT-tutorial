import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const stakingDeployment: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const rewardToken = await ethers.getContract("RewardToken");
  const rewardTokenAddress = await rewardToken.getAddress();
  const stakingDeployment = await deploy("Staking", {
    from: deployer,
    args: [rewardTokenAddress, rewardTokenAddress],
    log: true,
  });
};

stakingDeployment.tags = ["all", "staking"];
export default stakingDeployment;
