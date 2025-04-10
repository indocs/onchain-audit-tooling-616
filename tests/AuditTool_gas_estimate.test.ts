import { ethers } from "hardhat";

describe("AuditTool - deployment gas estimate", function () {
  it("should estimate deployment gas for AuditTool without executing deployment", async function () {
    const AuditTool = await ethers.getContractFactory("AuditTool");
    const deployTx = AuditTool.getDeployTransaction();
    // Estimate gas for deployment without sending the transaction
    const gasEstimate = await ethers.provider.estimateGas(deployTx);
    // Basic sanity checks to avoid false positives
    if (gasEstimate.lte(0)) {
      throw new Error("Gas estimate should be greater than zero");
    }
    // Optional: log for debugging (can be silenced in CI)
    // eslint-disable-next-line no-console
    console.log("AuditTool deployment gas estimate:", gasEstimate.toString());
  });
});
