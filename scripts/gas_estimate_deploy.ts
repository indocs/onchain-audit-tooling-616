import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying AuditTool from:", deployer.address);

  const AuditTool = await ethers.getContractFactory("AuditTool");
  const audit = await AuditTool.deploy();
  const receipt = await audit.deployTransaction.wait();

  console.log("AuditTool deployed at:", audit.address);
  console.log("Deployment gas used:", receipt.gasUsed.toString());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
