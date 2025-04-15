// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;
/**
 * @title IDreamVerifier
 * @notice Interface for the Zero-Knowledge Proof Verifier contract for Dream Submissions.
 *         The actual implementation depends on the ZK circuit and proving scheme used (e.g., Plonk, Groth16).
 */
interface IDreamVerifier {
    /**
     * @notice Verifies a ZK proof.
     * @param proof The ZK proof bytes generated off-chain.
     * @param publicSignals The public inputs/outputs associated with the proof.
     *                      The exact structure depends on the circuit design.
     *                      Example: [tokenId, userIdentifierHash, dreamContentHash, timestamp]
     * @return bool True if the proof is valid, false otherwise.
     */
    function verifyProof(
        bytes calldata proof,
        uint256[] calldata publicSignals
    ) external view returns (bool);
}

