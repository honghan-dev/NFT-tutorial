import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployRewardToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const rewardToken = await deploy("RewardToken", {
    from: deployer,
    args: [],
    log: true,
  });
};

deployRewardToken.tags = ["all", "rewardToken"];
export default deployRewardToken;