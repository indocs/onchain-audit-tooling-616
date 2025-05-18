// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Small gas-optimized helper library for arithmetic operations where overflow is impossible.
// Internal pure functions enable inlining and avoid storage reads.
library GasOptimLite {
    // Unchecked addition to save gas when the caller guarantees no overflow.
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        unchecked { return a + b; }
    }
}
