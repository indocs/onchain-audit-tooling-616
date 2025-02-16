// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// A minimal gas-optimized helper library for arithmetic
library GasOptim {
    // Adds two numbers using unchecked to skip overflow checks (safe for controlled usage)
    function addUncheck(uint256 a, uint256 b) internal pure returns (uint256) {
        unchecked {
            return a + b;
        }
    }

    // Subtracts two numbers using unchecked to save gas on underflow-unsafe paths
    function subUncheck(uint256 a, uint256 b) internal pure returns (uint256) {
        unchecked {
            return a - b;
        }
    }
}
