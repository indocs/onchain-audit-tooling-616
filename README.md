# On-chain Audit Tooling

This repository contains a Solidity-based on-chain auditing tool along with tests.

Changes in this release focus on DX enhancements and documentation.

Usage
- Install dependencies
  - npm install

- Compile
  - npx hardhat compile

- Test
  - npx hardhat test

- Run a local node (for manual deployment testing)
  - npx hardhat node

- Deploy to a network (local or configured testnet)
  - Ensure a network is configured in hardhat.config.js
  - Example local deployment:
    - npx hardhat run scripts/deploy.js --network localhost

  - If you have a private network or a testnet, replace localhost with your network name, e.g.:
    - npx hardhat run scripts/deploy.js --network goerli

Design Notes
- Testing approach
  - Use Hardhat’s fixture system (loadFixture) to reset state between tests for deterministic results.
  - Prefer unit tests for individual contracts and integration tests for interactions between contracts.
  - Mock external dependencies where appropriate to isolate on-chain auditing logic.
  - Verify events, emitted logs, and state changes in addition to function results.
  - Keep tests fast and deterministic by avoiding real-time dependencies (e.g., oracles) where possible.

- Test environment and practices
  - Pin Solidity compiler version in hardhat.config.js to avoid drift between environments.
  - Use HDWalletProvider or explicit private keys in a local node for deployment tests; never commit secrets.
  - Use gas metrics and assert within reasonable gas bounds to catch regressions.
  - Use supported Hardhat plugins (e.g., waffle, chai) for expressive assertions.

- Deployment considerations
  - Separate deployment scripts from tests to ensure a clean deployment flow.
  - Parameterize deployments with environment-specific values (e.g., addresses, booleans) to support multiple networks.
  - Verify on-chain state after deployment to catch misconfigurations early.

- Quality and maintainability
  - Document public functions in a concise API summary and keep inline comments up to date.
  - Add examples for typical auditing workflows to help reviewers reproduce results.

If you’d like, I can tailor the deployment script names, network configurations, or add a simple one-file walkthrough script to automate compile-test-deploy in a single command.