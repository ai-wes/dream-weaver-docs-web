// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title DreamWeaverJournal
 * @notice Stores journal entries generated by the DreamWeaver AI upon reaching evolution milestones.
 * @dev Entries are added by the contract owner (acting as the AI's oracle).
 *      Entries are linked to the corresponding evolution level and optionally the state hash anchor transaction.
 */
contract DreamWeaverJournal is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
uint256 private _entryIds;



    // Structure for each journal entry
    struct JournalEntry {
        uint256 id;          // Unique ID for the entry
        uint256 level;       // AI evolution level at the time of writing
        string entryText;    // The AI-generated journal text
        uint256 timestamp;   // Timestamp when the entry was recorded on-chain
        bytes32 anchorTxHash; // Optional: Tx hash from DreamWeaverGraph.updateGraphState for this level
        address recorder;    // Address that recorded the entry (owner/oracle)
    }

    // Array to store all journal entries chronologically
    JournalEntry[] public entries;

    // Mapping from entry ID to its index in the entries array for quick lookup
    mapping(uint256 => uint256) private _entryIndexById;
    
    // Mapping to track if an entry ID exists
    mapping(uint256 => bool) private _entryExists;

    // Event emitted when a new entry is added
    event EntryAdded(
        uint256 indexed entryId,
        uint256 indexed level,
        uint256 timestamp,
        bytes32 anchorTxHash,
        address recorder
    );

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @notice Initializes the contract.
     * @param initialOwner The initial owner (oracle address).
     */
    function initialize(address initialOwner) public initializer {
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
    }

    /**
     * @dev Required for UUPS upgradeability. Only owner can authorize upgrades.
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

/**
 * @notice Adds a new journal entry. Only callable by the owner (oracle).
 * @param _level The AI evolution level for this entry.
 * @param _entryText The AI-generated text for the journal.
 * @param _anchorTxHash Optional transaction hash from the corresponding state anchor. Use bytes32(0) if not applicable.
 */
function addEntry(
    uint256 _level,
    string memory _entryText,
    bytes32 _anchorTxHash
) external onlyOwner {
    _entryIds += 1;
    uint256 newEntryId = _entryIds;

    JournalEntry memory newEntry = JournalEntry({
        id: newEntryId,
        level: _level,
        entryText: _entryText,
        timestamp: block.timestamp,
        anchorTxHash: _anchorTxHash,
        recorder: msg.sender
    });

    entries.push(newEntry);
    _entryIndexById[newEntryId] = entries.length - 1;
    _entryExists[newEntryId] = true;

    emit EntryAdded(
        newEntryId,
        _level,
        block.timestamp,
        _anchorTxHash,
        msg.sender
    );
}

    /**
     * @notice Gets the total number of journal entries recorded.
     * @return The count of entries.
     */
    function getEntryCount() external view returns (uint256) {
        return entries.length;
    }

    /**
     * @notice Retrieves a specific journal entry by its index in the chronological array.
     * @param _index The index of the entry (0 to getEntryCount() - 1).
     * @return The JournalEntry struct.
     */
    function getEntryByIndex(uint256 _index) external view returns (JournalEntry memory) {
        require(_index < entries.length, "DreamWeaverJournal: Index out of bounds");
        return entries[_index];
    }

     /**
     * @notice Retrieves a specific journal entry by its unique ID.
     * @param _entryId The unique ID of the entry.
     * @return The JournalEntry struct.
     */
    function getEntryById(uint256 _entryId) external view returns (JournalEntry memory) {
        require(_entryExists[_entryId], "DreamWeaverJournal: Invalid entry ID");
        return entries[_entryIndexById[_entryId]];
    }
}
