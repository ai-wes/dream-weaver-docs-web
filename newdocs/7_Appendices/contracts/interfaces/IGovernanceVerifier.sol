// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;
/**
 * @title IGovernanceVerifier
 * @notice Interface for the Zero-Knowledge Proof Verifier contract for Anonymous Governance Voting.
 *         The actual implementation depends on the ZK circuit and proving scheme.
 */
interface IGovernanceVerifier {
    /**
     * @notice Verifies a ZK proof for voting.
     * @param proof The ZK proof bytes generated off-chain.
     * @param publicSignals The public inputs/outputs associated with the proof.
     *                      The exact structure depends on the circuit design.
     *                      Example: [proposalId, voterIdentifierHash, votingWeight, voteSupport(0 or 1)]
     * @return bool True if the proof is valid, false otherwise.
     */
    function verifyProof(
        bytes calldata proof,
        uint256[] calldata publicSignals
    ) external view returns (bool);
}