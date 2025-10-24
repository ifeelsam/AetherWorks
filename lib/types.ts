export type UserRole = "brand" | "creator" | "both"

export type ApplicationStatus = "pending" | "shortlisted" | "accepted" | "rejected" | "withdrawn"

export interface AuthUser {
  id: string
  email?: string
  walletAddress: string
  role: UserRole
  createdAt: Date
}

export interface CompanyInfo {
  name: string
  website: string
  industry: string
  teamSize: string
  country: string
  description?: string
  logoUrl?: string
  socialLinks?: Record<string, string>
}

export interface BrandProfile {
  userId: string
  companyInfo: CompanyInfo
  kybStatus: "pending" | "approved" | "rejected"
  walletBalance: number
  paymentToken: "ETH" | "USDC" | "USDT"
  termsAccepted: boolean
  completedSteps: number
}

export interface CampaignBrief {
  id?: string
  title: string
  description: string
  category: string
  contentFormats: string[]
  creatorsNeeded: number
  deliverables: Deliverable[]
  brandGuidelines?: string
  references?: string[]
  hashtags?: string[]
  budgetPerCreator: number
  paymentToken: "ETH" | "USDC" | "USDT"
  paymentStructure: "single" | "milestone"
  milestones?: Milestone[]
  applicationDeadline: Date
  contentDueDate: Date
  licenseDuration: string
  ownershipType: "license" | "full-rights"
  usageRights: string[]
  territory: string
  exclusivity: "non-exclusive" | "category" | "full"
  allowModifications: boolean
}

export interface Deliverable {
  id: string
  type: string
  quantity: number
  specs: Record<string, string>
}

export interface Milestone {
  id: string
  name: string
  percentage: number
  amount: number
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  senderRole: "creator" | "brand"
  content: string
  timestamp: Date
  attachments?: Attachment[]
  read: boolean
}

export interface Attachment {
  id: string
  name: string
  type: string
  url: string
  size: number
}

export interface TimelineEvent {
  id: string
  status: ApplicationStatus
  title: string
  description: string
  timestamp: Date
  completed: boolean
  current: boolean
}

export interface Application {
  id: string
  campaignId: string
  creatorId: string
  creatorName: string
  creatorAvatar?: string
  brandId: string
  brandName: string
  brandLogo?: string
  brandVerified: boolean
  status: ApplicationStatus
  proposal: {
    pitch: string
    portfolioItems: PortfolioItem[]
    canMeetDeadline: boolean
    proposedDeadline?: Date
    notes?: string
  }
  submittedAt: Date
  viewedAt?: Date
  decisionAt?: Date
  withdrawnAt?: Date
  withdrawalReason?: string
  messages: Message[]
  timeline: TimelineEvent[]
  campaign: CampaignBrief
  feedback?: string
}

export interface PortfolioItem {
  id: string
  title: string
  platform: string
  views: number
  engagement: number
  duration: string
  thumbnail?: string
  url?: string
}
