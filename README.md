# onchain-audit-tooling

Continuous on-chain audit checks that catch regressions before deployment, reducing risk and speeding release cycles.

Outline
- What is this project?
- Design goals
- Contracts overview
- Tooling and workflows
- Hardhat usage

Quickstart
1. Install dependencies
2. Configure environment
3. Compile & test
4. Deploy to a network

Deployment (Hardhat)
- Configure networks in hardhat.config.ts
- Run deployment script: ts-node scripts/deploy.ts --network <network-name>
- Verify contract if etherscan integration is desired

Roadmap
- Extend checks for reentrancy, overflow/underflow, and access-control patterns
- Add on-chain regression suite and reporting dashboards

Usage notes
- All checks are registered by an owner and executed as read/emit events to enable on-chain audit trails.
