import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('AuditTool baseline', function () {
  it('should deploy AuditTool and expose a non-zero address', async function () {
    const AuditTool = await ethers.getContractFactory('AuditTool');
    const auditTool = await AuditTool.deploy();
    await auditTool.deployed();

    expect(auditTool.address).to.properAddress;
  });
});
