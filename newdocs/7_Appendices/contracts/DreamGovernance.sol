// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

// Import the Verifier interface
import "./interfaces/IGovernanceVerifier.sol"; // Assuming interfaces folder exists

interface IGovernanceDreamNFT {
    function dreamLevel(uint256 tokenId) external view returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);
    function balanceOf(address owner) external view returns (uint256);
}

/**
 * @title DreamGovernance
 * @notice Governance contract allowing DreamNFT holders (level 3+) to vote on proposals.
 *         Includes anonymous voting via Zero-Knowledge Proofs.
 */
contract DreamGovernance is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    IGovernanceDreamNFT public dreamNFT;

    // Address of the deployed ZK Verifier contract for governance votes
    address public governanceVerifier;

    struct Proposal {
        string description;
        uint256 startBlock;
        uint256 endBlock;
        uint256 yesVotes; // Tracks total weight
        uint256 noVotes;  // Tracks total weight
        bool executed;
        mapping(address => bool) hasVoted; // Tracks non-anonymous votes by address
        mapping(bytes32 => bool) hasVotedAnonymously; // Tracks anonymous votes by unique identifier hash
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public nextProposalId;

    // Events
    event ProposalCreated(uint256 proposalId, string description, uint256 startBlock, uint256 endBlock);
    event Voted(uint256 proposalId, address voter, bool support, uint256 weight);
    event VotedAnonymously(uint256 proposalId, bytes32 indexed voterIdentifierHash, bool support, uint256 weight); // New event for ZKP votes
    event ProposalExecuted(uint256 proposalId, bool passed);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @notice Initialize the contract
     * @param _dreamNFT Address of the DreamNFT contract
     */
    function initialize(address _dreamNFT) public initializer {
        require(_dreamNFT != address(0), "DreamGovernance: invalid NFT address");
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        dreamNFT = IGovernanceDreamNFT(_dreamNFT);
    }

    /**
     * @notice Create a new proposal.
     */
    function createProposal(string memory _description, uint256 _votingPeriodInBlocks) external onlyOwner {
        require(_votingPeriodInBlocks > 0, "DreamGovernance: invalid voting period");
        uint256 proposalId = nextProposalId++;
        uint256 start = block.number;
        uint256 end = block.number + _votingPeriodInBlocks;

        // Initialize each field separately
        Proposal storage prop = proposals[proposalId];
        prop.description = _description;
        prop.startBlock = start;
        prop.endBlock = end;
        prop.yesVotes = 0;
        prop.noVotes = 0;
        prop.executed = false;
        // Mappings are implicitly initialized

        emit ProposalCreated(proposalId, _description, start, end);
    }

    /**
     * @notice Vote on a proposal directly, revealing the voter's address and tokens used.
     */
    function vote(uint256 proposalId, bool support, uint256[] calldata tokenIds) external {
        Proposal storage prop = proposals[proposalId];
        _checkCanVote(proposalId, msg.sender); // Reusable check

        uint256 totalWeight = 0;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            // Verify ownership and calculate weight
            require(dreamNFT.ownerOf(tokenIds[i]) == msg.sender, "DreamGovernance: Not owner of specified token");
            uint256 level = dreamNFT.dreamLevel(tokenIds[i]);
            if (level >= 3) {
                 totalWeight += _calculateWeight(level);
            }
        }
        require(totalWeight > 0, "DreamGovernance: No voting power with specified tokens");

        prop.hasVoted[msg.sender] = true; // Mark address as voted

        _recordVote(proposalId, totalWeight, support);

        emit Voted(proposalId, msg.sender, support, totalWeight);
    }

     /**
     * @notice Vote on a proposal anonymously using a Zero-Knowledge Proof.
     * @param proposalId The ID of the proposal.
     * @param _proof The ZK proof generated off-chain.
     * @param _publicSignals Public signals from the ZK proof. Structure depends on the circuit.
     *                       Example: [proposalIdFromProof, voterIdentifierHash, votingWeight, voteSupport(0 or 1)]
     */
    function voteWithProof(
        uint256 proposalId,
        bytes calldata _proof,
        uint256[] calldata _publicSignals
    ) external {
        require(governanceVerifier != address(0), "DreamGovernance: Governance Verifier not set");
        require(_publicSignals.length >= 4, "DreamGovernance: Invalid public signals length"); // Basic check

        // Verify the proof
        bool verified = IGovernanceVerifier(governanceVerifier).verifyProof(_proof, _publicSignals);
        require(verified, "DreamGovernance: Invalid vote proof");

        // Extract data from public signals (adjust indices based on your circuit)
        uint256 proposalIdFromProof = _publicSignals[0];
        bytes32 voterIdentifierHash = bytes32(_publicSignals[1]); // Unique hash identifying the voter anonymously
        uint256 votingWeight = _publicSignals[2];
        bool support = _publicSignals[3] == 1; // Assuming 1 for yes, 0 for no

        // --- Perform checks ---
        require(proposalId == proposalIdFromProof, "DreamGovernance: Proof is for wrong proposal");
        require(votingWeight > 0, "DreamGovernance: Proof shows zero voting weight");

        Proposal storage prop = proposals[proposalId];

        // Check proposal status and if identifier has already voted
        _checkCanVoteAnonymous(proposalId, voterIdentifierHash);

        prop.hasVotedAnonymously[voterIdentifierHash] = true; // Mark identifier as voted

        _recordVote(proposalId, votingWeight, support);

        emit VotedAnonymously(proposalId, voterIdentifierHash, support, votingWeight);
    }


    /**
     * @notice Execute a proposal after voting ends.
     */
    function executeProposal(uint256 proposalId) external {
        Proposal storage prop = proposals[proposalId];
        require(!prop.executed, "DreamGovernance: Already executed");
        require(block.number > prop.endBlock, "DreamGovernance: Voting period not ended");

        bool passed = prop.yesVotes >= prop.noVotes; // Simple majority wins
        prop.executed = true;

        // --- Add proposal execution logic here ---
        // This part depends entirely on what the proposals are meant to do.
        // Examples:
        // - Call a function on another contract
        // - Change a parameter in this contract
        // - Transfer funds from a treasury
        // if (passed) {
        //     // execute action
        // }

        emit ProposalExecuted(proposalId, passed);
    }

    // --- Internal Helper Functions ---

    /**
     * @dev Common checks before allowing a direct vote.
     */
    function _checkCanVote(uint256 proposalId, address voter) internal view {
        Proposal storage prop = proposals[proposalId];
        require(block.number >= prop.startBlock && block.number <= prop.endBlock, "DreamGovernance: Not in voting window");
        require(!prop.hasVoted[voter], "DreamGovernance: Address already voted");
        require(!prop.executed, "DreamGovernance: Proposal already executed");
    }

    /**
     * @dev Common checks before allowing an anonymous vote.
     */
    function _checkCanVoteAnonymous(uint256 proposalId, bytes32 voterIdentifierHash) internal view {
        Proposal storage prop = proposals[proposalId];
        require(block.number >= prop.startBlock && block.number <= prop.endBlock, "DreamGovernance: Not in voting window");
        require(!prop.hasVotedAnonymously[voterIdentifierHash], "DreamGovernance: Identifier already voted");
        require(!prop.executed, "DreamGovernance: Proposal already executed");
    }

    /**
     * @dev Calculates voting weight based on NFT level.
     */
    function _calculateWeight(uint256 level) internal pure returns (uint256) {
        if (level == 3) return 1;
        if (level == 4) return 2;
        if (level == 5) return 4;
        return 0;
    }

    /**
     * @dev Records the vote weight in the proposal storage.
     */
    function _recordVote(uint256 proposalId, uint256 weight, bool support) internal {
         Proposal storage prop = proposals[proposalId];
         if (support) {
            prop.yesVotes += weight;
        } else {
            prop.noVotes += weight;
        }
    }

    // --- Admin Functions ---

    /**
     * @notice Sets the address of the ZK Verifier contract for governance votes.
     */
    function setGovernanceVerifier(address _verifier) external onlyOwner {
        require(_verifier != address(0), "DreamGovernance: Zero address for verifier");
        governanceVerifier = _verifier;
    }

    /**
     * @dev Authorization function for UUPS upgrades.
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}