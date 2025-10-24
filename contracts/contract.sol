// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title UGCMarketplace
 * @dev Simple UGC marketplace for brands to create briefs and creators to submit content
 * @notice Escrow-based system with milestone payments
 */
contract YourContract {
    
    // ============ State Variables ============
    
    address public owner;
    uint256 public platformFeePercent = 200; // 2% = 200 basis points
    uint256 public constant BASIS_POINTS = 10000;
    
    uint256 public briefCounter;
    uint256 public submissionCounter;
    
    // ============ Structs ============
    
    struct Brief {
        uint256 briefId;
        address brand;
        string title;
        string description;
        string contentRequirements; // JSON or IPFS hash
        uint256 paymentPerCreator;
        uint256 creatorsNeeded;
        uint256 selectedCreators;
        uint256 totalEscrowed;
        uint256 submissionDeadline;
        uint256 contentDeadline;
        BriefStatus status;
        uint256 createdAt;
    }
    
    struct Submission {
        uint256 submissionId;
        uint256 briefId;
        address creator;
        string proposalText;
        string portfolioLinks; // JSON array or IPFS hash
        string deliverableLinks; // Submitted content links (IPFS/Arweave)
        SubmissionStatus status;
        uint256 submittedAt;
        uint256 paymentReleased;
    }
    
    enum BriefStatus {
        Active,          // Accepting applications
        Closed,          // No more submissions
        InProgress,      // Creators selected, work in progress
        Completed,       // All deliverables accepted
        Cancelled        // Brief cancelled, funds returned
    }
    
    enum SubmissionStatus {
        Pending,         // Awaiting brand review
        Accepted,        // Selected for the campaign
        Rejected,        // Not selected
        Delivered,       // Content submitted
        Approved,        // Payment released
        Disputed         // In dispute
    }
    
    // ============ Mappings ============
    
    mapping(uint256 => Brief) public briefs;
    mapping(uint256 => Submission) public submissions;
    mapping(uint256 => uint256[]) public briefSubmissions; // briefId => submissionIds[]
    mapping(address => uint256[]) public creatorSubmissions; // creator => submissionIds[]
    mapping(address => uint256[]) public brandBriefs; // brand => briefIds[]
    
    // ============ Events ============
    
    event BriefCreated(
        uint256 indexed briefId,
        address indexed brand,
        string title,
        uint256 paymentPerCreator,
        uint256 creatorsNeeded,
        uint256 submissionDeadline
    );
    
    event BriefUpdated(uint256 indexed briefId, string title);
    event BriefCancelled(uint256 indexed briefId, uint256 refundAmount);
    event BriefStatusChanged(uint256 indexed briefId, BriefStatus newStatus);
    
    event SubmissionCreated(
        uint256 indexed submissionId,
        uint256 indexed briefId,
        address indexed creator,
        uint256 timestamp
    );
    
    event SubmissionStatusChanged(
        uint256 indexed submissionId,
        SubmissionStatus newStatus
    );
    
    event CreatorSelected(
        uint256 indexed submissionId,
        uint256 indexed briefId,
        address indexed creator
    );
    
    event PaymentReleased(
        uint256 indexed submissionId,
        address indexed creator,
        uint256 amount
    );
    
    event EscrowFunded(uint256 indexed briefId, uint256 amount);
    
    // ============ Modifiers ============
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    modifier onlyBrand(uint256 _briefId) {
        require(briefs[_briefId].brand == msg.sender, "Not brief owner");
        _;
    }
    
    modifier briefExists(uint256 _briefId) {
        require(_briefId > 0 && _briefId <= briefCounter, "Brief does not exist");
        _;
    }
    
    modifier submissionExists(uint256 _submissionId) {
        require(_submissionId > 0 && _submissionId <= submissionCounter, "Submission does not exist");
        _;
    }
    
    // ============ Constructor ============
    
    constructor() {
        owner = msg.sender;
    }
    
    // ============ Brand Functions ============
    
    /**
     * @dev Create a new brief with escrow funding
     * @param _title Brief title
     * @param _description Brief description/requirements
     * @param _contentRequirements Content specs (JSON or IPFS hash)
     * @param _paymentPerCreator Payment amount per creator in wei
     * @param _creatorsNeeded Number of creators to hire
     * @param _submissionDeadline Unix timestamp for submission deadline
     * @param _contentDeadline Unix timestamp for content delivery deadline
     */
    function createBrief(
        string memory _title,
        string memory _description,
        string memory _contentRequirements,
        uint256 _paymentPerCreator,
        uint256 _creatorsNeeded,
        uint256 _submissionDeadline,
        uint256 _contentDeadline
    ) external payable returns (uint256) {
        require(bytes(_title).length > 0, "Title required");
        require(_paymentPerCreator > 0, "Payment must be > 0");
        require(_creatorsNeeded > 0, "Must need at least 1 creator");
        require(_submissionDeadline > block.timestamp, "Deadline must be future");
        require(_contentDeadline > _submissionDeadline, "Content deadline must be after submission deadline");
        
        // Calculate total escrow needed (payment + platform fee)
        uint256 totalPayment = _paymentPerCreator * _creatorsNeeded;
        uint256 platformFee = (totalPayment * platformFeePercent) / BASIS_POINTS;
        uint256 totalRequired = totalPayment + platformFee;
        
        require(msg.value >= totalRequired, "Insufficient escrow funds");
        
        briefCounter++;
        
        briefs[briefCounter] = Brief({
            briefId: briefCounter,
            brand: msg.sender,
            title: _title,
            description: _description,
            contentRequirements: _contentRequirements,
            paymentPerCreator: _paymentPerCreator,
            creatorsNeeded: _creatorsNeeded,
            selectedCreators: 0,
            totalEscrowed: msg.value,
            submissionDeadline: _submissionDeadline,
            contentDeadline: _contentDeadline,
            status: BriefStatus.Active,
            createdAt: block.timestamp
        });
        
        brandBriefs[msg.sender].push(briefCounter);
        
        emit BriefCreated(
            briefCounter,
            msg.sender,
            _title,
            _paymentPerCreator,
            _creatorsNeeded,
            _submissionDeadline
        );
        
        emit EscrowFunded(briefCounter, msg.value);
        
        return briefCounter;
    }
    
    /**
     * @dev Update brief details (only before submissions accepted)
     */
    function updateBrief(
        uint256 _briefId,
        string memory _title,
        string memory _description,
        string memory _contentRequirements
    ) external briefExists(_briefId) onlyBrand(_briefId) {
        Brief storage brief = briefs[_briefId];
        require(brief.status == BriefStatus.Active, "Can only update active briefs");
        require(brief.selectedCreators == 0, "Cannot update after selecting creators");
        
        brief.title = _title;
        brief.description = _description;
        brief.contentRequirements = _contentRequirements;
        
        emit BriefUpdated(_briefId, _title);
    }
    
    /**
     * @dev Cancel brief and refund escrow (only if no creators selected)
     */
    function cancelBrief(uint256 _briefId) 
        external 
        briefExists(_briefId) 
        onlyBrand(_briefId) 
    {
        Brief storage brief = briefs[_briefId];
        require(brief.status != BriefStatus.Cancelled, "Already cancelled");
        require(brief.selectedCreators == 0, "Cannot cancel after selecting creators");
        
        uint256 refundAmount = brief.totalEscrowed;
        brief.totalEscrowed = 0;
        brief.status = BriefStatus.Cancelled;
        
        (bool success, ) = brief.brand.call{value: refundAmount}("");
        require(success, "Refund failed");
        
        emit BriefCancelled(_briefId, refundAmount);
        emit BriefStatusChanged(_briefId, BriefStatus.Cancelled);
    }
    
    /**
     * @dev Close brief to new submissions (manual or auto after deadline)
     */
    function closeBrief(uint256 _briefId) 
        external 
        briefExists(_briefId) 
        onlyBrand(_briefId) 
    {
        Brief storage brief = briefs[_briefId];
        require(brief.status == BriefStatus.Active, "Brief not active");
        
        brief.status = BriefStatus.Closed;
        emit BriefStatusChanged(_briefId, BriefStatus.Closed);
    }
    
    /**
     * @dev Accept creator submission and lock their payment
     */
    function acceptSubmission(uint256 _submissionId) 
        external 
        submissionExists(_submissionId) 
    {
        Submission storage submission = submissions[_submissionId];
        Brief storage brief = briefs[submission.briefId];
        
        require(msg.sender == brief.brand, "Not brief owner");
        require(submission.status == SubmissionStatus.Pending, "Already processed");
        require(brief.selectedCreators < brief.creatorsNeeded, "All creators selected");
        require(brief.status != BriefStatus.Cancelled, "Brief cancelled");
        
        submission.status = SubmissionStatus.Accepted;
        brief.selectedCreators++;
        
        // Change brief status to InProgress once first creator selected
        if (brief.status == BriefStatus.Active || brief.status == BriefStatus.Closed) {
            brief.status = BriefStatus.InProgress;
            emit BriefStatusChanged(submission.briefId, BriefStatus.InProgress);
        }
        
        emit SubmissionStatusChanged(_submissionId, SubmissionStatus.Accepted);
        emit CreatorSelected(_submissionId, submission.briefId, submission.creator);
    }
    
    /**
     * @dev Reject creator submission
     */
    function rejectSubmission(uint256 _submissionId) 
        external 
        submissionExists(_submissionId) 
    {
        Submission storage submission = submissions[_submissionId];
        Brief storage brief = briefs[submission.briefId];
        
        require(msg.sender == brief.brand, "Not brief owner");
        require(submission.status == SubmissionStatus.Pending, "Already processed");
        
        submission.status = SubmissionStatus.Rejected;
        emit SubmissionStatusChanged(_submissionId, SubmissionStatus.Rejected);
    }
    
    /**
     * @dev Approve delivered content and release payment
     */
    function approveDeliverable(uint256 _submissionId) 
        external 
        submissionExists(_submissionId) 
    {
        Submission storage submission = submissions[_submissionId];
        Brief storage brief = briefs[submission.briefId];
        
        require(msg.sender == brief.brand, "Not brief owner");
        require(submission.status == SubmissionStatus.Delivered, "Content not delivered");
        require(brief.totalEscrowed >= brief.paymentPerCreator, "Insufficient escrow");
        
        submission.status = SubmissionStatus.Approved;
        submission.paymentReleased = brief.paymentPerCreator;
        brief.totalEscrowed -= brief.paymentPerCreator;
        
        (bool success, ) = submission.creator.call{value: brief.paymentPerCreator}("");
        require(success, "Payment failed");
        
        emit PaymentReleased(_submissionId, submission.creator, brief.paymentPerCreator);
        emit SubmissionStatusChanged(_submissionId, SubmissionStatus.Approved);
        
        // Check if all creators completed
        _checkBriefCompletion(submission.briefId);
    }
    
    // ============ Creator Functions ============
    
    /**
     * @dev Submit proposal to a brief
     */
    function submitProposal(
        uint256 _briefId,
        string memory _proposalText,
        string memory _portfolioLinks
    ) external briefExists(_briefId) returns (uint256) {
        Brief storage brief = briefs[_briefId];
        
        require(brief.status == BriefStatus.Active, "Brief not accepting submissions");
        require(block.timestamp < brief.submissionDeadline, "Submission deadline passed");
        require(bytes(_proposalText).length > 0, "Proposal text required");
        
        submissionCounter++;
        
        submissions[submissionCounter] = Submission({
            submissionId: submissionCounter,
            briefId: _briefId,
            creator: msg.sender,
            proposalText: _proposalText,
            portfolioLinks: _portfolioLinks,
            deliverableLinks: "",
            status: SubmissionStatus.Pending,
            submittedAt: block.timestamp,
            paymentReleased: 0
        });
        
        briefSubmissions[_briefId].push(submissionCounter);
        creatorSubmissions[msg.sender].push(submissionCounter);
        
        emit SubmissionCreated(submissionCounter, _briefId, msg.sender, block.timestamp);
        
        return submissionCounter;
    }
    
    /**
     * @dev Submit final deliverables (content links)
     */
    function submitDeliverables(
        uint256 _submissionId,
        string memory _deliverableLinks
    ) external submissionExists(_submissionId) {
        Submission storage submission = submissions[_submissionId];
        Brief storage brief = briefs[submission.briefId];
        
        require(msg.sender == submission.creator, "Not submission owner");
        require(submission.status == SubmissionStatus.Accepted, "Not accepted");
        require(block.timestamp < brief.contentDeadline, "Content deadline passed");
        require(bytes(_deliverableLinks).length > 0, "Content links required");
        
        submission.deliverableLinks = _deliverableLinks;
        submission.status = SubmissionStatus.Delivered;
        
        emit SubmissionStatusChanged(_submissionId, SubmissionStatus.Delivered);
    }
    
    // ============ View Functions ============
    
    /**
     * @dev Get all briefs (for marketplace listing)
     * @return Array of all brief IDs
     */
    function getAllBriefs() external view returns (uint256[] memory) {
        uint256[] memory allBriefs = new uint256[](briefCounter);
        for (uint256 i = 1; i <= briefCounter; i++) {
            allBriefs[i - 1] = i;
        }
        return allBriefs;
    }
    
    /**
     * @dev Get active briefs only
     */
    function getActiveBriefs() external view returns (uint256[] memory) {
        uint256 activeCount = 0;
        
        // Count active briefs
        for (uint256 i = 1; i <= briefCounter; i++) {
            if (briefs[i].status == BriefStatus.Active) {
                activeCount++;
            }
        }
        
        // Build array
        uint256[] memory activeBriefs = new uint256[](activeCount);
        uint256 index = 0;
        for (uint256 i = 1; i <= briefCounter; i++) {
            if (briefs[i].status == BriefStatus.Active) {
                activeBriefs[index] = i;
                index++;
            }
        }
        
        return activeBriefs;
    }
    
    /**
     * @dev Get brief details
     */
    function getBrief(uint256 _briefId) 
        external 
        view 
        briefExists(_briefId) 
        returns (Brief memory) 
    {
        return briefs[_briefId];
    }
    
    /**
     * @dev Get all submissions for a brief
     */
    function getBriefSubmissions(uint256 _briefId) 
        external 
        view 
        briefExists(_briefId) 
        returns (uint256[] memory) 
    {
        return briefSubmissions[_briefId];
    }
    
    /**
     * @dev Get submission details with creator info
     */
    function getSubmission(uint256 _submissionId) 
        external 
        view 
        submissionExists(_submissionId) 
        returns (Submission memory) 
    {
        return submissions[_submissionId];
    }
    
    /**
     * @dev Get multiple submissions (batch query for frontend)
     */
    function getSubmissionsBatch(uint256[] memory _submissionIds) 
        external 
        view 
        returns (Submission[] memory) 
    {
        Submission[] memory result = new Submission[](_submissionIds.length);
        for (uint256 i = 0; i < _submissionIds.length; i++) {
            result[i] = submissions[_submissionIds[i]];
        }
        return result;
    }
    
    /**
     * @dev Get creator's submissions
     */
    function getCreatorSubmissions(address _creator) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return creatorSubmissions[_creator];
    }
    
    /**
     * @dev Get brand's briefs
     */
    function getBrandBriefs(address _brand) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return brandBriefs[_brand];
    }
    
    // ============ Internal Functions ============
    
    /**
     * @dev Check if all creators have completed and mark brief as complete
     */
    function _checkBriefCompletion(uint256 _briefId) internal {
        Brief storage brief = briefs[_briefId];
        
        uint256 approvedCount = 0;
        uint256[] memory subs = briefSubmissions[_briefId];
        
        for (uint256 i = 0; i < subs.length; i++) {
            if (submissions[subs[i]].status == SubmissionStatus.Approved) {
                approvedCount++;
            }
        }
        
        if (approvedCount >= brief.creatorsNeeded) {
            brief.status = BriefStatus.Completed;
            
            // Return remaining escrow (platform fee) to owner
            if (brief.totalEscrowed > 0) {
                uint256 remaining = brief.totalEscrowed;
                brief.totalEscrowed = 0;
                (bool success, ) = owner.call{value: remaining}("");
                require(success, "Fee transfer failed");
            }
            
            emit BriefStatusChanged(_briefId, BriefStatus.Completed);
        }
    }
    
    // ============ Admin Functions ============
    
    /**
     * @dev Update platform fee (owner only)
     */
    function setPlatformFee(uint256 _newFeePercent) external onlyOwner {
        require(_newFeePercent <= 1000, "Fee too high"); // Max 10%
        platformFeePercent = _newFeePercent;
    }
    
    /**
     * @dev Emergency withdraw (owner only, for platform fees)
     */
    function withdrawPlatformFees() external onlyOwner {
        uint256 balance = address(this).balance;
        
        // Calculate locked escrow
        uint256 lockedFunds = 0;
        for (uint256 i = 1; i <= briefCounter; i++) {
            if (briefs[i].status != BriefStatus.Completed && 
                briefs[i].status != BriefStatus.Cancelled) {
                lockedFunds += briefs[i].totalEscrowed;
            }
        }
        
        uint256 withdrawable = balance - lockedFunds;
        require(withdrawable > 0, "No fees to withdraw");
        
        (bool success, ) = owner.call{value: withdrawable}("");
        require(success, "Withdraw failed");
    }
    
    // ============ Fallback ============
    
    receive() external payable {}
}
