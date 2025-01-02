// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AuditTool
 * @dev Lightweight on-chain audit tool that registers and runs security checks
 *      with access control and simple on-chain state to verify regressions.
 */
contract AuditTool {
    address public owner;
    uint256 public lastCheckBlock;

    // Track registered audit patterns by a simple id
    mapping(bytes32 => bool) public patterns;

    event PatternRegistered(address indexed by, bytes32 indexed id);
    event CheckExecuted(address indexed by, bytes32 indexed id, uint256 blockNumber);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    error NotOwner();
    error PatternUnknown(bytes32 id);

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    modifier validPattern(bytes32 id) {
        if (!patterns[id]) revert PatternUnknown(id);
        _;
    }

    constructor() {
        owner = msg.sender;
        lastCheckBlock = block.number;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function registerPattern(bytes32 id) external onlyOwner {
        patterns[id] = true;
        emit PatternRegistered(msg.sender, id);
    }

    // Run a predefined check by id. This simulates an on-chain regression verify step.
    function runCheck(bytes32 id) external validPattern(id) returns (bool) {
        lastCheckBlock = block.number;
        emit CheckExecuted(msg.sender, id, lastCheckBlock);
        return true;
    }

    // A simple reentrancy-protected function that could be part of a regression suite.
    uint256 private _lock;
    modifier nonReentrant() {
        require(_lock == 0, "Reentrant");
        _lock = 1;
        _;
        _lock = 0;
    }

    function criticalFunction() external nonReentrant {
        // In a real audit, this would perform a sensitive state transition.
        // Here we simulate a minimal state update and event emission for tests.
        emit CheckExecuted(msg.sender, keccak256(abi.encodePacked("critical")), block.number);
    }
}
