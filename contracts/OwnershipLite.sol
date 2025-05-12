// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// A minimal, non-invasive access-control mixin that can be used by existing contracts
// without forcing a specific ownership model. The child contract must implement
// isOwner() to integrate with this lightweight pattern.
abstract contract OwnershipLite {
    // Child contracts should implement the ownership check logic.
    function isOwner() public view virtual returns (bool);

    // Lightweight access control modifier that relies on the child-defined isOwner().
    modifier onlyOwner() {
        require(isOwner(), "OwnershipLite: Not owner");
        _;
    }
}
