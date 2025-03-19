# Gas optimization notes for onchain-audit-tooling-616

This document outlines recommended gas-related optimizations and how to apply them in this repository.

Highlights:

- Enable Solidity optimizer in Hardhat configuration to reduce runtime gas costs for deployed contracts.
- Prefer read-only (view/pure) functions to minimize on-chain gas usage when data is derivable off-chain.
- Minimize storage reads/writes by caching frequently accessed values within a function scope when possible.
- Use enums and small value types to reduce storage slot usage where semantics allow.

Recommended actions (non-breaking):

1) Enable Solidity optimizer in hardhat.config.ts
   - Set optimizer: { enabled: true, runs: 200 } under the Solidity compiler configuration.
   - Rationale: Optimizer can substantially reduce gas costs for deployed contracts, especially for frequently called functions.

2) AuditTool.sol
   - Review critical public/external functions for unnecessary storage reads.
   - Where possible, replace repeated storage reads with local variables, and return computed values without extra writes.

3) Tests and deployment
   - After enabling optimization, re-run tests and measure gas usage for key functions to ensure expected gas reductions.

Notes:
- Enabling optimization can slightly increase bytecode size; ensure it does not adversely affect deployment gas beyond acceptable thresholds.
- The recommended runs value (e.g., 200) is a balance between optimization and potential compilation time. Adjust as needed for production deployments.
