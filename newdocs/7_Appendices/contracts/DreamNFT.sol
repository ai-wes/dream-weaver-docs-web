// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "./interfaces/IDreamVerifier.sol";


contract DreamNFT is 
    Initializable, 
    ERC721Upgradeable, 
    OwnableUpgradeable,
    UUPSUpgradeable,
    ERC2981Upgradeable
{
    using Strings for uint256;

    // ------------------ Events ------------------
    event DreamMinted(uint256 indexed tokenId, address indexed owner, string imageURI);
    event DreamUpgraded(uint256 indexed tokenId, uint256 newLevel, string newImageURI);
    event DreamMetadataUpdated(uint256 indexed tokenId, string metadataURI);
    event ModifiersUpdated(uint256 indexed tokenId, string newModifiers);
    event Withdrawal(address indexed owner, uint256 amount);
    event DreamProofAccepted(uint256 indexed tokenId, bytes32 indexed userIdentifierHash, string dreamContentHash);


    // ------------------ Constants & Variables ------------------
    uint256 public constant MAX_BASE_SUPPLY = 1500;
    uint256 public constant MAX_LEVEL = 5;
    
    // Initial cooldown period set to 25 days (per the whitepaper)
    uint256 public initialCooldown;
    
    // Token ID counter for minted tokens
    uint256 public nextTokenId;
    
    // Payment: mintPrice is set in the initializer
    uint256 public mintPrice;
    
    mapping(uint256 => uint256) public dreamLevel;
    mapping(uint256 => uint256) public cooldownEnd;
    mapping(uint256 => string) public imageURI;
    mapping(uint256 => string) public tokenMetadata;
    // Mapping for additional modifier information (e.g. "Genesis Edition")
    mapping(uint256 => string) public tokenModifiers;
    
    // Level names for display
    string[5] public LEVEL_NAMES;
    
    // External contract addresses (for fragments, upgrades, etc.)
    address public fragmentNFTAddress;
    address public upgradeSystem;
    
    //Address of the deployed ZK Verifier contract for dream submissions
    address public dreamVerifier;

    // Special flag to ensure optional "Oneiric tokens" minted only once
    bool public oneiricMinted;
    
    // For optional off-chain metadata
    string private _baseURIStorage;
    
    // ------------------ Creator Royalty ------------------
    // Address to receive creator royalties (secondary market)
    address public creator;

    // ------------------ Modifiers ------------------
    modifier onlyUpgradeSystem() {
        require(msg.sender == upgradeSystem, "DreamNFT: Not the upgrade system");
        _;
    }
    
    modifier onlyOwnerOrUpgradeSystem() {
        require(msg.sender == owner() || msg.sender == upgradeSystem, "DreamNFT: Not owner or upgrade system");
        _;
    }
    
    modifier tokenExists(uint256 tokenId) {
        require(tokenId < nextTokenId, "DreamNFT: Token does not exist");
        _;
    }
    
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
    
    function initialize() public initializer {
        __ERC721_init("Dream NFT", "DREAM");
        __Ownable_init(msg.sender); // Our version requires an argument.
        // Ensure owner is correctly set.
        _transferOwnership(_msgSender());
        __UUPSUpgradeable_init();
        __ERC2981_init();

        initialCooldown = 25 days;
        mintPrice = 0.15 ether; // Set the mint price here
        LEVEL_NAMES[0] = "Whispered";
        LEVEL_NAMES[1] = "Ascended";
        LEVEL_NAMES[2] = "Ethereal";
        LEVEL_NAMES[3] = "Cosmic";
        LEVEL_NAMES[4] = "Oneiric";
        
        // Set creator as deployer by default; can be updated later if needed
        creator = _msgSender();
        // Set default royalty to 6% (600 basis points)
        _setDefaultRoyalty(creator, 600);
    }
    
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    // ------------------ Admin Functions ------------------
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _baseURIStorage = newBaseURI;
    }
    
    function _baseURI() internal view override returns (string memory) {
        return _baseURIStorage;
    }
    
    function setFragmentNFTAddress(address _fragmentNFTAddress) external onlyOwner {
        require(_fragmentNFTAddress != address(0), "DreamNFT: Zero address");
        fragmentNFTAddress = _fragmentNFTAddress;
    }
    
    function setUpgradeSystem(address _upgradeSystem) external onlyOwner {
        require(_upgradeSystem != address(0), "DreamNFT: Zero address");
        upgradeSystem = _upgradeSystem;
    }
    
    function setInitialCooldown(uint256 _cooldown) external onlyOwner {
        initialCooldown = _cooldown;
    }
    
    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }
    
    /**
     * @notice Set a new creator address for royalty payments.
     */
    function setCreator(address _creator) external onlyOwner {
        require(_creator != address(0), "DreamNFT: Zero address");
        creator = _creator;
        _setDefaultRoyalty(creator, 600);
    }
    
    
    /**
     * @notice Sets the address of the ZK Verifier contract for dream submissions.
     */
    function setDreamVerifier(address _verifier) external onlyOwner {
        require(_verifier != address(0), "DreamNFT: Zero address for verifier");
        dreamVerifier = _verifier;
    }

    // ------------------ Core Functionalities ------------------
    /**
     * @notice Awaken a DreamSoul (Lucid Core) by minting a new token and initializing it at Level 1.
     * @param newImageURI The image URI for the minted DreamSoul.
     *
     * Only the owner can call this function.
     */
    function awakenCore(string memory newImageURI) external payable onlyOwner {
        require(msg.value >= mintPrice, "DreamNFT: Insufficient payment for minting");
        require(nextTokenId < MAX_BASE_SUPPLY, "DreamNFT: Max base supply reached");
        uint256 tokenId = nextTokenId;
        _safeMint(msg.sender, tokenId);
        nextTokenId++;
        
        // Initialize token state to Level 1.
        dreamLevel[tokenId] = 1;
        cooldownEnd[tokenId] = block.timestamp + initialCooldown;
        imageURI[tokenId] = newImageURI;
        tokenModifiers[tokenId] = "None"; // Default value set to "None" for proper metadata
        
        emit DreamMinted(tokenId, msg.sender, newImageURI);
    }
    
    /**
     * @notice Called by the upgrade system to level up the DreamSoul.
     */
    function levelUp(uint256 tokenId, string memory newImageURI) external onlyUpgradeSystem tokenExists(tokenId) {
        require(dreamLevel[tokenId] < MAX_LEVEL, "DreamNFT: Max level reached");
        dreamLevel[tokenId] += 1;
        imageURI[tokenId] = newImageURI;
        
        emit DreamUpgraded(tokenId, dreamLevel[tokenId], newImageURI);
    }
    
    /**
     * @notice Called by the upgrade system to set a new cooldown.
     */
    function setCooldown(uint256 tokenId, uint256 newCooldown) external onlyUpgradeSystem tokenExists(tokenId) {
        cooldownEnd[tokenId] = newCooldown;
    }
    
    /**
     * @notice Allows the owner or upgrade system to update a token's metadata pointer.
     */
    function updateDreamMetadata(uint256 tokenId, string memory newMetadataURI) 
        external 
        onlyOwnerOrUpgradeSystem 
        tokenExists(tokenId) 
    {
        tokenMetadata[tokenId] = newMetadataURI;
        emit DreamMetadataUpdated(tokenId, newMetadataURI);
    }
    
    /**
     * @notice Allows the owner or upgrade system to update the token's modifiers field.
     * This field can store additional information such as "Genesis Edition" or "Special Edition".
     */
    function updateModifiers(uint256 tokenId, string memory newModifiers)
        external
        onlyOwnerOrUpgradeSystem
        tokenExists(tokenId)
    {
        tokenModifiers[tokenId] = newModifiers;
        emit ModifiersUpdated(tokenId, newModifiers);
    }




    /**
     * @notice Submit proof of a valid dream submission off-chain.
     * @param _proof The ZK proof generated off-chain.
     * @param _publicSignals Public signals from the ZK proof. Structure depends on the circuit.
     *                       Example: [tokenId, userIdentifierHash, dreamContentHash (string as uint), timestamp]
     *                       Note: Storing string hashes as uint might require conversion logic.
     *                       Using bytes32 for hashes is generally better if possible in the circuit.
     */
    function submitDreamProof(bytes calldata _proof, uint256[] calldata _publicSignals)
        external
        tokenExists(_publicSignals[0]) // Assuming tokenId is the first public signal
    {
        require(dreamVerifier != address(0), "DreamNFT: Dream Verifier not set");
        require(_publicSignals.length >= 3, "DreamNFT: Invalid public signals length"); // Basic check

        // Verify the proof using the deployed Verifier contract
        bool verified = IDreamVerifier(dreamVerifier).verifyProof(_proof, _publicSignals);
        require(verified, "DreamNFT: Invalid dream proof");

        uint256 tokenId = _publicSignals[0];
        // Assuming userIdentifierHash is bytes32, packed into uint256 signals[1]
        bytes32 userIdentifierHash = bytes32(_publicSignals[1]);
        // Assuming dreamContentHash is a string represented somehow (e.g., IPFS CID hash parts)
        // For simplicity, let's assume it's passed as a single uint for now, representing a hash.
        // A better approach might be passing bytes32 or multiple uints.
        string memory dreamContentHash = string(abi.encodePacked("hash:", _publicSignals[2].toString())); // Placeholder conversion

        // Check if the caller is associated with the userIdentifierHash (off-chain logic might enforce this)
        // Or, the circuit could enforce that the proof can only be submitted by the NFT owner.
        // For simplicity here, we assume the proof implies validity for the token.
        require(ownerOf(tokenId) == msg.sender, "DreamNFT: Caller not owner of token ID in proof");

        // --- On-chain actions upon successful verification ---
        // 1. Emit an event acknowledging the valid submission.
        emit DreamProofAccepted(tokenId, userIdentifierHash, dreamContentHash);

        // 2. Optional: Link the content hash (e.g., IPFS CID) to the token.
        //    This could replace or supplement updateDreamMetadata.
        //    Using a mapping: mapping(uint256 => string[]) public dreamProofHashes;
        //    dreamProofHashes[tokenId].push(dreamContentHash);

        // 3. Optional: Increment a counter for verified submissions per token.
        //    mapping(uint256 => uint256) public verifiedDreamCount;
        //    verifiedDreamCount[tokenId]++;

        // Note: Avoid storing large data on-chain. The event is often sufficient
        // for off-chain systems to update databases or UIs.
    }



    
    /**
     * @notice Mint special Oneiric tokens to the contract owner (optional).
     */
    function mintOneiricForOwner(string memory oneiricImageURI) external onlyOwner {
        require(!oneiricMinted, "DreamNFT: Oneiric tokens already minted");
        require(nextTokenId + 2 <= MAX_BASE_SUPPLY, "DreamNFT: Not enough supply left");
        
        for (uint256 i = 0; i < 2; i++) {
            uint256 tokenId = nextTokenId++;
            _safeMint(owner(), tokenId);
            
            dreamLevel[tokenId] = MAX_LEVEL;
            imageURI[tokenId] = oneiricImageURI;
            cooldownEnd[tokenId] = block.timestamp;
            tokenModifiers[tokenId] = "None"; // Default value
            
            emit DreamMinted(tokenId, owner(), oneiricImageURI);
            emit DreamUpgraded(tokenId, MAX_LEVEL, oneiricImageURI);
        }
        
        oneiricMinted = true;
    }
    
    // ------------------ Withdraw Function ------------------
    /**
     * @notice Withdraw the Ether balance from the contract to the owner.
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "DreamNFT: No funds to withdraw");
        address _owner = owner();
        require(_owner != address(0), "DreamNFT: Owner is null");
        (bool successOwner, ) = payable(_owner).call{value: balance}("");
        require(successOwner, "Withdrawal to owner failed");
        emit Withdrawal(_owner, balance);
    }
    
    // ------------------ Metadata ------------------
    function tokenURI(uint256 tokenId) public view override tokenExists(tokenId) returns (string memory) {
        string memory currentImage = bytes(imageURI[tokenId]).length > 0
            ? imageURI[tokenId]
            : "ipfs://placeholder";
        uint256 lvl = dreamLevel[tokenId];
        string memory levelStr = lvl.toString();
        string memory levelName = LEVEL_NAMES[lvl - 1];
        string memory status = "Unfinalized";
        uint256 remainingCooldown = block.timestamp >= cooldownEnd[tokenId] ? 0 : cooldownEnd[tokenId] - block.timestamp;
        
        // Build attributes JSON array WITH spaces for proper formatting.
        string memory attributes = string(
            abi.encodePacked(
                '[{"trait_type": "Level", "value": "', levelStr,
                '"}, {"trait_type": "Rank", "value": "', levelName,
                '"}, {"trait_type": "Status", "value": "', status,
                '"}, {"trait_type": "Cooldown (sec)", "value": "', remainingCooldown.toString(),
                '"}, {"trait_type": "Modifiers", "value": "', tokenModifiers[tokenId],
                '"}]'
            )
        );
        
        string memory nameStr = string(abi.encodePacked("DreamNFT #", tokenId.toString()));
        bytes memory json = abi.encodePacked(
            '{"name": "', nameStr,
            '", "description": "An evolving DreamNFT at level ', levelStr, '.", ',
            '"image": "', currentImage,
            '", "attributes": ', attributes, '}'
        );
        
        return string(abi.encodePacked("data:application/json;base64,", Base64.encode(json)));
    }
    
    // ------------------ Interface Support ------------------
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Upgradeable, ERC2981Upgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
