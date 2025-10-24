interface EscrowRecord {
  campaignId: string
  amount: number
  token: string
  depositor: string
  status: "pending" | "locked" | "released" | "refunded"
  createdAt: string
  releasedAt?: string
}

export class EscrowService {
  static async depositFunds(campaignId: string, amount: number, token: string, walletAddress: string): Promise<string> {
    // Create escrow record
    const escrowRecord: EscrowRecord = {
      campaignId,
      amount,
      token,
      depositor: walletAddress,
      status: "locked",
      createdAt: new Date().toISOString(),
    }

    // Store escrow record
    localStorage.setItem(`escrow_${campaignId}`, JSON.stringify(escrowRecord))

    // Simulate transaction
    const txHash = `0x${Math.random().toString(16).slice(2, 66)}`

    // Emit event
    window.dispatchEvent(
      new CustomEvent("escrowDeposited", {
        detail: {
          campaignId,
          amount,
          token,
          txHash,
        },
      }),
    )

    return txHash
  }

  static async releaseFunds(campaignId: string, recipientAddress: string, amount: number): Promise<string> {
    const escrowRecord = await this.getEscrow(campaignId)
    if (!escrowRecord) {
      throw new Error("Escrow not found")
    }

    if (escrowRecord.status !== "locked") {
      throw new Error("Escrow is not in locked state")
    }

    // Update escrow status
    escrowRecord.status = "released"
    escrowRecord.releasedAt = new Date().toISOString()
    localStorage.setItem(`escrow_${campaignId}`, JSON.stringify(escrowRecord))

    // Simulate transaction
    const txHash = `0x${Math.random().toString(16).slice(2, 66)}`

    // Emit event
    window.dispatchEvent(
      new CustomEvent("escrowReleased", {
        detail: {
          campaignId,
          recipient: recipientAddress,
          amount,
          txHash,
        },
      }),
    )

    return txHash
  }

  static async getEscrow(campaignId: string): Promise<EscrowRecord | null> {
    const data = localStorage.getItem(`escrow_${campaignId}`)
    return data ? JSON.parse(data) : null
  }

  static async getEscrowBalance(campaignId: string): Promise<number> {
    const escrow = await this.getEscrow(campaignId)
    return escrow ? escrow.amount : 0
  }

  static async refundEscrow(campaignId: string): Promise<string> {
    const escrowRecord = await this.getEscrow(campaignId)
    if (!escrowRecord) {
      throw new Error("Escrow not found")
    }

    // Update escrow status
    escrowRecord.status = "refunded"
    localStorage.setItem(`escrow_${campaignId}`, JSON.stringify(escrowRecord))

    // Simulate transaction
    const txHash = `0x${Math.random().toString(16).slice(2, 66)}`

    // Emit event
    window.dispatchEvent(
      new CustomEvent("escrowRefunded", {
        detail: {
          campaignId,
          amount: escrowRecord.amount,
          txHash,
        },
      }),
    )

    return txHash
  }
}
