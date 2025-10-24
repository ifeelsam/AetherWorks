import type { CampaignBrief } from "./types"

interface CampaignRecord extends CampaignBrief {
  id: string
  publishedAt: string
  txHash: string
  status: "active" | "paused" | "completed"
  escrowAmount: number
}

export class CampaignService {
  static async publishCampaign(campaignData: Partial<CampaignBrief>, walletAddress: string): Promise<CampaignRecord> {
    // Prepare campaign metadata for IPFS/Arweave
    const metadata = {
      title: campaignData.title,
      description: campaignData.description,
      category: campaignData.category,
      contentFormats: campaignData.contentFormats,
      brandGuidelines: campaignData.brandGuidelines,
      references: campaignData.references,
      hashtags: campaignData.hashtags,
      licenseTerms: {
        ownershipType: campaignData.ownershipType,
        usageRights: campaignData.usageRights,
        territory: campaignData.territory,
        exclusivity: campaignData.exclusivity,
        allowModifications: campaignData.allowModifications,
        duration: campaignData.licenseDuration,
      },
    }

    // Calculate escrow amount
    const escrowAmount = (campaignData.budgetPerCreator || 0) * (campaignData.creatorsNeeded || 0) * 1.02

    // Create campaign record
    const campaignRecord: CampaignRecord = {
      ...(campaignData as CampaignBrief),
      id: `campaign_${Date.now()}`,
      publishedAt: new Date().toISOString(),
      txHash: `0x${Math.random().toString(16).slice(2, 66)}`,
      status: "active",
      escrowAmount,
    }

    // Store in localStorage (in production, this would be on-chain)
    localStorage.setItem(`campaign_${campaignRecord.id}`, JSON.stringify(campaignRecord))

    // Emit event for indexing
    window.dispatchEvent(
      new CustomEvent("campaignPublished", {
        detail: {
          campaignId: campaignRecord.id,
          txHash: campaignRecord.txHash,
          metadata,
        },
      }),
    )

    return campaignRecord
  }

  static async getCampaign(campaignId: string): Promise<CampaignRecord | null> {
    const data = localStorage.getItem(`campaign_${campaignId}`)
    return data ? JSON.parse(data) : null
  }

  static async listCampaigns(walletAddress: string): Promise<CampaignRecord[]> {
    const campaigns: CampaignRecord[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith("campaign_")) {
        const data = localStorage.getItem(key)
        if (data) {
          campaigns.push(JSON.parse(data))
        }
      }
    }
    return campaigns
  }

  static async updateCampaignStatus(campaignId: string, status: "active" | "paused" | "completed"): Promise<void> {
    const campaign = await this.getCampaign(campaignId)
    if (campaign) {
      campaign.status = status
      localStorage.setItem(`campaign_${campaignId}`, JSON.stringify(campaign))
    }
  }
}
