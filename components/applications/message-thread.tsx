"use client"

import type React from "react"

import { useState } from "react"
import type { Message } from "@/lib/types"

interface MessageThreadProps {
  messages: Message[]
  messagesEndRef: React.RefObject<HTMLDivElement>
  applicationStatus: string
}

export default function MessageThread({ messages, messagesEndRef, applicationStatus }: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState("")
  const [sending, setSending] = useState(false)

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    setSending(true)
    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 500))
    setNewMessage("")
    setSending(false)
  }

  return (
    <div className="border-4 border-black p-8 bg-white space-y-6">
      <h2 className="space-grotesk text-3xl font-bold">Messages</h2>

      {/* Message Thread */}
      <div className="bg-gray-50 border-4 border-black p-6 h-96 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <p className="text-2xl mb-2">💬</p>
            <p className="text-gray-600">No messages yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Once your application is reviewed, you can communicate directly with the brand here.
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.senderRole === "creator" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs border-4 border-black p-4 ${
                    msg.senderRole === "creator" ? "bg-green-100" : "bg-white"
                  }`}
                >
                  <p className="text-xs font-mono text-gray-600 mb-2">
                    {msg.senderName} • {msg.timestamp.toLocaleTimeString()}
                  </p>
                  <p className="text-sm text-gray-800">{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input - Only show if application is active */}
      {(applicationStatus === "pending" || applicationStatus === "shortlisted" || applicationStatus === "accepted") && (
        <div className="space-y-3">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full border-4 border-black p-4 h-24 focus:outline-none focus:bg-yellow-100 resize-none"
          />
          <div className="flex gap-3 justify-end">
            <button className="border-4 border-black px-6 py-2 font-semibold hover:bg-gray-100 transition-colors">
              Attach File
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sending}
              className="border-4 border-black bg-black text-white px-6 py-2 font-semibold hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send Message →"}
            </button>
          </div>
          <p className="text-xs text-gray-600">Attachments accepted: Images, PDFs, Videos (max 25MB)</p>
        </div>
      )}
    </div>
  )
}
