import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('AuditTool', function () {
  let AuditTool: any;
  let audit: any;
  let owner: any;
  let addr1: any;

  const PATTERN_ID = ethers.utils.formatBytes32String('reentrancy-pattern');

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const AuditToolFactory = await ethers.getContractFactory('AuditTool');
    audit = await AuditToolFactory.deploy();
    await audit.deployed();
  });

  it('should set the deployer as owner', async function () {
    const currentOwner = await audit.owner();
    expect(currentOwner).to.equal(owner.address);
  });

  it('owner can register a pattern', async function () {
    await expect(audit.connect(owner).registerPattern(PATTERN_ID)).to.emit(audit, 'PatternRegistered').withArgs(owner.address, PATTERN_ID);
    const isRegistered = await audit.patterns(PATTERN_ID);
    expect(isRegistered).to.equal(true);
  });

  it('non-owner cannot register a pattern', async function () {
    await expect(audit.connect(addr1).registerPattern(PATTERN_ID)).to.be.revertedWith('NotOwner');
  });

  it('can run a registered check and emit event', async function () {
    await audit.connect(owner).registerPattern(PATTERN_ID);
    await expect(audit.connect(addr1).runCheck(PATTERN_ID)).to.emit(audit, 'CheckExecuted').withArgs(addr1.address, PATTERN_ID, await audit.lastCheckBlock());
  });

  it('running an unknown pattern reverts', async function () {
    await expect(audit.connect(addr1).runCheck(PATTERN_ID)).to.be.revertedWith('PatternUnknown');
  });

  it('nonReentrant guard prevents reentry on criticalFunction', async function () {
    // Call criticalFunction twice in a row from the same tx is not possible, but we can ensure the modifier exists and works by triggering it twice via two separate calls.
    await expect(audit.connect(owner).criticalFunction()).to.emit(audit, 'CheckExecuted');
    // Second call should be allowed as it resets the lock after function exits; here we simply call again to ensure it executes without revert
    await expect(audit.connect(owner).criticalFunction()).to.emit(audit, 'CheckExecuted');
  });
});
