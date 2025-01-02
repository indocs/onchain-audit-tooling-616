// Simple deployment script for Hardhat
import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying AuditTool with', deployer.address);

  const Factory = await ethers.getContractFactory('AuditTool');
  const contract = await Factory.deploy();
  await contract.deployed();

  console.log('AuditTool deployed at', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
