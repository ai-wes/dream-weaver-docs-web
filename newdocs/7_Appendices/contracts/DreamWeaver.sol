// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title DreamWeaverGraph
 * @notice This contract anchors the off-chain DreamWeaver knowledge graph by storing a cryptographic fingerprint (e.g., an IPFS CID)
 *         of its current state. It is integrated into the broader DreamWeaver ecosystem—only accounts holding a LucidCore token may update it.
 *
 *         In your ecosystem, this contract serves as a verifiable on-chain record of the evolving DreamWeaver graph.
 *         This contract is upgradeable using the UUPS pattern.
 */
contract DreamWeaverGraph is 
    Initializable, 
    OwnableUpgradeable,
    UUPSUpgradeable
{
    // The LucidCore token contract is used for token gating. Only accounts holding at least one LucidCore token can update the graph.
    IERC721 public lucidCoreToken;

    // Structure to store individual dream node metadata
    struct DreamNode {
        string ipfsHash;   // IPFS CID that points to detailed dream data (text, images, 3D assets, etc.)
        address creator;   // Address that submitted the dream
        uint256 timestamp; // Timestamp of submission or update
    }

    // Mapping to store all dream nodes by their unique ID
    mapping(uint256 => DreamNode) public dreamNodes;
    uint256 public nodeCount;

    // Event declarations
    event DreamNodeAdded(uint256 indexed nodeId, string ipfsHash, address indexed creator, uint256 timestamp);
    event DreamNodeUpdated(uint256 indexed nodeId, string newIpfsHash, uint256 timestamp);
    event GraphStateUpdated(string newStateHash, uint256 timestamp);

    // This variable stores a cryptographic fingerprint (e.g., an IPFS hash or Merkle root) of the current off-chain DreamWeaver graph state.
    string public graphStateHash;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @notice Initializes the contract, replacing the constructor.
     * @param initialOwner The initial owner of the contract
     * @param _lucidCoreTokenAddress The address of the deployed LucidCore token contract.
     */
    function initialize(address initialOwner, address _lucidCoreTokenAddress) public initializer {
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        
        require(_lucidCoreTokenAddress != address(0), "Invalid LucidCore token address");
        lucidCoreToken = IERC721(_lucidCoreTokenAddress);
    }
    
    /**
     * @dev Function that should revert when `msg.sender` is not authorized to upgrade the contract.
     * Called by {upgradeTo} and {upgradeToAndCall}.
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    /**
     * @notice Modifier to restrict access to only those accounts that hold a LucidCore token.
     */
    modifier onlyLucidCoreHolder() {
        require(lucidCoreToken.balanceOf(msg.sender) > 0, "Must hold a LucidCore token to interact");
        _;
    }

    /**
     * @notice Adds a new dream node to the on-chain graph.
     * @dev Only callable by the owner (or via a trusted oracle) and only if the caller holds a LucidCore token.
     * @param _ipfsHash The IPFS hash (or other fingerprint) of the dream node data.
     */
    function addDreamNode(string memory _ipfsHash) external onlyOwner onlyLucidCoreHolder {
        nodeCount++;
        dreamNodes[nodeCount] = DreamNode(_ipfsHash, msg.sender, block.timestamp);
        emit DreamNodeAdded(nodeCount, _ipfsHash, msg.sender, block.timestamp);
    }

    /**
     * @notice Updates an existing dream node's data.
     * @dev Only callable by the owner and requires the caller to hold a LucidCore token.
     * @param _nodeId The unique ID of the dream node.
     * @param _newIpfsHash The new IPFS hash representing the updated dream data.
     */
    function updateDreamNode(uint256 _nodeId, string memory _newIpfsHash) external onlyOwner onlyLucidCoreHolder {
        require(_nodeId > 0 && _nodeId <= nodeCount, "Node does not exist");
        dreamNodes[_nodeId].ipfsHash = _newIpfsHash;
        dreamNodes[_nodeId].timestamp = block.timestamp;
        emit DreamNodeUpdated(_nodeId, _newIpfsHash, block.timestamp);
    }

    /**
     * @notice Retrieves the details of a specific dream node.
     * @param _nodeId The unique ID of the dream node.
     * @return The IPFS hash, creator, and timestamp of the node.
     */
    function getDreamNode(uint256 _nodeId) external view returns (string memory, address, uint256) {
        require(_nodeId > 0 && _nodeId <= nodeCount, "Node does not exist");
        DreamNode memory node = dreamNodes[_nodeId];
        return (node.ipfsHash, node.creator, node.timestamp);
    }

    /**
     * @notice Updates the on-chain fingerprint of the off-chain DreamWeaver graph.
     * @dev This function is intended to be called by an off-chain oracle (via owner privileges) that computes the current graph state,
     *      uploads it to IPFS (or computes a Merkle root), and then updates the on-chain record.
     * @param newHash The new graph state fingerprint.
     */
    function updateGraphState(string memory newHash) external onlyOwner {
        graphStateHash = newHash;
        emit GraphStateUpdated(newHash, block.timestamp);
    }

    /**
     * @notice Returns the current graph state fingerprint.
     */
    function getGraphState() external view returns (string memory) {
        return graphStateHash;
    }
}
