// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

interface IDreamNFT {
    function ownerOf(uint256 tokenId) external view returns (address);
    function levelUp(uint256 tokenId, string memory newImageURI) external;
    function setCooldown(uint256 tokenId, uint256 newCooldown) external;
    function dreamLevel(uint256 tokenId) external view returns (uint256);
    function cooldownEnd(uint256 tokenId) external view returns (uint256);
}

interface IFragmentOfLucidity {
    function ownerOf(uint256 tokenId) external view returns (address);
    function isRedeemed(uint256 tokenId) external view returns (bool);
    function markRedeemed(uint256 tokenId) external;
}

interface IBurnableERC20 {
    function balanceOf(address account) external view returns (uint256);
    function burn(address from, uint256 amount) external;
}

contract DreamNFTUpgradeSystem is 
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable
{
    IDreamNFT public dreamNFT;
    IFragmentOfLucidity public fragmentNFT;
    IBurnableERC20 public timeToken; // for cooldown reductions

    // Base cooldown (set in initialize)
    uint256 public upgradeBaseCooldown;
    uint256 public minCooldown;

    // Challenge bonus: user => bonus seconds
    mapping(address => uint256) public challengeBonuses;

    // Winners pool: prize for the first to reach Level 5
    uint256 public winnersPool;

    address public firstOneiricWinner;
    bool public hasFirstOneiricWinner;
    uint256 public specialTokensAwarded;
    uint256 public constant SPECIAL_TOKENS_COUNT = 9;
    mapping(address => bool) public specialTokenHolders;

    // Overridden cooldown if set
    mapping(uint256 => uint256) public nextUpgradeTimestamp;

    // Fusion fee in Wei. 5% of the fragment price can be set externally or a fixed amount.
    uint256 public fusionFee;

    // -------------- Events --------------
    event NFTUpgraded(uint256 indexed tokenId, address indexed owner, uint256 newLevel, string newImageURI);
    event UpgradeCooldownUpdated(uint256 indexed tokenId, uint256 newCooldownTimestamp);
    event OneiricSovereignDeclared(address indexed winner, uint256 prizeAmount);
    event OracleAcolyteAwarded(address indexed acolyte, uint256 acolyteNumber);
    event ChallengeBonusUpdated(address indexed holder, uint256 bonus);
    event CooldownReduced(uint256 indexed tokenId, uint256 reductionInSeconds);
    event WinnersPoolDeposited(address indexed depositor, uint256 amount);
    event ETHWithdrawn(address indexed recipient, uint256 amount);
    event FusionFeeUpdated(uint256 newFee);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _dreamNFT,
        address _fragmentNFT,
        address _timeToken,
        uint256 _upgradeBaseCooldown,
        uint256 _minCooldown
    ) public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();

        require(
            _dreamNFT != address(0) &&
            _fragmentNFT != address(0) &&
            _timeToken != address(0),
            "UpgradeSystem: Invalid addresses"
        );

        dreamNFT = IDreamNFT(_dreamNFT);
        fragmentNFT = IFragmentOfLucidity(_fragmentNFT);
        timeToken = IBurnableERC20(_timeToken);

        upgradeBaseCooldown = _upgradeBaseCooldown; // e.g. 25 days
        minCooldown = _minCooldown;                 // e.g. 1 day or so
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    // ---------------- Fusion Fee ----------------
    /**
     * @notice Set the required 5% fusion fee in Wei.
     * Example: If a fragment is notionally 1 ETH, you'd set fusionFee = 0.05 ETH in Wei.
     */


    function setFusionFee(uint256 newFee) external onlyOwner {
        fusionFee = newFee;
        emit FusionFeeUpdated(newFee);
    }

    // ---------------- Upgrade Logic ----------------

    /**
     * @notice Upgrade a DreamNFT by fusing a Fragment of Lucidity, paying a 5% ETH fee.
     * @param tokenId The DreamNFT to upgrade.
     * @param fragmentTokenId The Fragment to fuse.
     * @param newImageURI Updated image or metadata URI after the upgrade.
     */

    function upgradeNFT(
        uint256 tokenId,
        uint256 fragmentTokenId,
        string memory newImageURI
    ) external payable nonReentrant {
        require(dreamNFT.ownerOf(tokenId) == msg.sender, "UpgradeSystem: Not the NFT owner");

        // Enforce fusion fee
        require(fusionFee > 0, "UpgradeSystem: Fusion fee not set");
        require(msg.value >= fusionFee, "UpgradeSystem: Insufficient ETH for fusion fee");

        // Check if fragment is valid
        require(fragmentNFT.ownerOf(fragmentTokenId) == msg.sender, "UpgradeSystem: Not the Fragment owner");
        require(!fragmentNFT.isRedeemed(fragmentTokenId), "UpgradeSystem: Fragment already redeemed");

        // Check cooldown
        uint256 nftCooldown = nextUpgradeTimestamp[tokenId];
        if (nftCooldown == 0) {
            nftCooldown = dreamNFT.cooldownEnd(tokenId);
        }
        require(block.timestamp >= nftCooldown, "UpgradeSystem: Cooldown not over");

        // Mark fragment as redeemed
        fragmentNFT.markRedeemed(fragmentTokenId);

        // Level up the NFT
        dreamNFT.levelUp(tokenId, newImageURI);

        // Send the fee to the contract owner (or you could direct it to winnersPool if desired)
        (bool sent, ) = owner().call{value: msg.value}("");
        require(sent, "UpgradeSystem: Fee transfer failed");

        // Calculate new cooldown
        uint256 newCooldown = block.timestamp + calculateCooldown(msg.sender);
        nextUpgradeTimestamp[tokenId] = newCooldown;
        dreamNFT.setCooldown(tokenId, newCooldown);

        emit NFTUpgraded(tokenId, msg.sender, dreamNFT.dreamLevel(tokenId), newImageURI);
        emit UpgradeCooldownUpdated(tokenId, newCooldown);

        // If NFT is now level 5, handle special awarding
        if (dreamNFT.dreamLevel(tokenId) == 5) {
            if (!hasFirstOneiricWinner) {
                hasFirstOneiricWinner = true;
                firstOneiricWinner = msg.sender;

                // Award entire winners pool
                uint256 prizeAmount = winnersPool;
                winnersPool = 0;
                (bool success, ) = msg.sender.call{value: prizeAmount}("");
                require(success, "UpgradeSystem: Prize transfer failed");

                emit OneiricSovereignDeclared(msg.sender, prizeAmount);
            } 
            else if (specialTokensAwarded < SPECIAL_TOKENS_COUNT && !specialTokenHolders[msg.sender]) {
                specialTokensAwarded++;
                specialTokenHolders[msg.sender] = true;
                emit OracleAcolyteAwarded(msg.sender, specialTokensAwarded);
            }
        }
    }


    function declareWinner(address winner) private {
    require(!hasFirstOneiricWinner, "Winner already declared");
    require(winner != address(0), "Invalid winner address");
    
    hasFirstOneiricWinner = true;
    firstOneiricWinner = winner;
    
    uint256 prizeAmount = winnersPool;
    winnersPool = 0;
    
    // Transfer prize with safety checks
    require(prizeAmount > 0, "No prize to transfer");
    (bool success, ) = payable(winner).call{value: prizeAmount}("");
    require(success, "Prize transfer failed");
    
    emit OneiricSovereignDeclared(winner, prizeAmount);
}


    /**
     * @notice Reduce the cooldown by burning Time Tokens.
     * @param tokenId The DreamNFT token ID.
     * @param timeTokenAmount The number of TimeTokens to burn (1 token = 1 hour = 3600 seconds).
     */
    function reduceCooldown(uint256 tokenId, uint256 timeTokenAmount) external nonReentrant {
        require(dreamNFT.ownerOf(tokenId) == msg.sender, "UpgradeSystem: Not NFT owner");
        require(timeTokenAmount > 0, "UpgradeSystem: Zero time token amount");

        uint256 reduction = timeTokenAmount * 3600;
        uint256 currentCooldown = getRemainingCooldown(tokenId);
        require(currentCooldown > 0, "UpgradeSystem: No active cooldown");

        // Burn the tokens
        timeToken.burn(msg.sender, timeTokenAmount);

        // Calculate new cooldown
        uint256 nftCooldown = nextUpgradeTimestamp[tokenId];
        if (nftCooldown == 0) {
            nftCooldown = dreamNFT.cooldownEnd(tokenId);
        }

        uint256 effectiveReduction = reduction > currentCooldown ? currentCooldown : reduction;
        uint256 newCooldownTimestamp = nftCooldown - effectiveReduction;

        // Ensure minCooldown is respected
        if (block.timestamp < newCooldownTimestamp) {
            uint256 remainAfterReduction = newCooldownTimestamp - block.timestamp;
            if (remainAfterReduction < minCooldown) {
                newCooldownTimestamp = block.timestamp + minCooldown;
            }
        } else {
            // If we've overshot, set it to minCooldown from now
            newCooldownTimestamp = block.timestamp + minCooldown;
        }

        nextUpgradeTimestamp[tokenId] = newCooldownTimestamp;
        dreamNFT.setCooldown(tokenId, newCooldownTimestamp);

        emit CooldownReduced(tokenId, effectiveReduction);
        emit UpgradeCooldownUpdated(tokenId, newCooldownTimestamp);
    }

    // ---------------- Utility / Calculations ----------------

    function getRemainingCooldown(uint256 tokenId) public view returns (uint256) {
        uint256 nftCooldown = nextUpgradeTimestamp[tokenId];
        if (nftCooldown == 0) {
            nftCooldown = dreamNFT.cooldownEnd(tokenId);
        }
        return block.timestamp >= nftCooldown ? 0 : nftCooldown - block.timestamp;
    }

    /**
     * @notice Calculate new cooldown for a user after upgrade, factoring in challenge bonuses.
     */
    function calculateCooldown(address user) public view returns (uint256) {
        uint256 bonus = challengeBonuses[user];
        if (upgradeBaseCooldown > bonus) {
            uint256 cd = upgradeBaseCooldown - bonus;
            return cd < minCooldown ? minCooldown : cd;
        }
        return minCooldown;
    }

    // ---------------- Challenge Bonus ----------------
    function setChallengeBonus(address user, uint256 bonus) external onlyOwner {
        require(bonus <= upgradeBaseCooldown, "UpgradeSystem: Bonus exceeds base cooldown");
        challengeBonuses[user] = bonus;
        emit ChallengeBonusUpdated(user, bonus);
    }

    function setBatchChallengeBonuses(address[] calldata users, uint256[] calldata bonuses) external onlyOwner {
        require(users.length == bonuses.length, "UpgradeSystem: Mismatched array lengths");
        for (uint256 i = 0; i < users.length; i++) {
            require(bonuses[i] <= upgradeBaseCooldown, "UpgradeSystem: Bonus exceeds base cooldown");
            challengeBonuses[users[i]] = bonuses[i];
            emit ChallengeBonusUpdated(users[i], bonuses[i]);
        }
    }

    // ---------------- Winners Pool / Admin ----------------
    function depositWinnersPool() external payable onlyOwner {
        require(msg.value > 0, "UpgradeSystem: No ETH sent");
        winnersPool += msg.value;
        emit WinnersPoolDeposited(msg.sender, msg.value);
    }

    function withdrawETH(address recipient, uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "UpgradeSystem: Insufficient balance");
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "UpgradeSystem: Withdraw failed");
        emit ETHWithdrawn(recipient, amount);
    }


    function withdrawETH() external onlyOwner nonReentrant {
    uint256 balance = address(this).balance;
    require(balance > 0, "No ETH to withdraw");
    
    (bool success, ) = payable(owner()).call{value: balance}("");
    require(success, "ETH withdrawal failed");
}


    receive() external payable {}
}
