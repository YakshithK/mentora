"use client"

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react"
import { SendIcon, Sparkles, CornerDownLeft } from "lucide-react"
import GetStartedAI from "./AIGetStarted"
import { Message } from "@/types/ai-message"
import Image from "next/image"

const AIChabot = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [prompt, setPrompt] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [prompt])

  const handleSendMessage = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    if (!prompt.trim()) return

    const userMessage: Message = { role: "user", content: prompt }
    setMessages((prev) => [...prev, userMessage])
    setPrompt("")
    setIsLoading(true)

    if (textareaRef.current) {
      textareaRef.current.style.height = "24px"
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch assistant response.")
      }

      const data = await response.json()
      const assistantMessage: Message = {
        role: "assistant",
        content: data.chat,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." },
      ])
    } finally {
      setIsLoading(false)
    }
  }


  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col bg-white">
      <main className="flex-1 overflow-hidden flex flex-col max-w-5xl w-full mx-auto">
        <div className="flex-1 overflow-y-auto max-h-[40vh] px-4 py-6">
            <div
              className="space-y-6 "
            >
              {messages.length === 0 ? (
                <GetStartedAI />
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <Image
                          src="/images/ai-profile-pic.png"
                          width={60}
                          height={60}
                          className="rounded-full"
                          alt="AI Avatar"
                        />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-[85%] shadow-sm ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex space-x-2 items-center h-6">
                      <div className="animate-pulse">
                        Thinking <small>...</small>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
        </div>

        {/* Prompt Area */}
        <div className="fixed bottom-0 left-0 w-full flex items-center justify-center border-t border-gray-200 bg-white px-4 py-4 z-50">
          <div className="w-screen">
            <form onSubmit={handleSendMessage} className="relative">
              <div className="overflow-hidden rounded-xl border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 shadow-sm bg-white">
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about different college programs..."
                  className="w-full resize-none py-3 px-4 outline-none max-h-[200px] min-h-[24px]"
                  rows={1}
                />
                <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200">
                  <div className="text-xs text-gray-500 flex items-center">
                    <CornerDownLeft className="h-3 w-3 mr-1" />
                    <kbd>
                      Press <span className="px-1 py-0.5 bg-gray-100 rounded text-xs">Enter</span> to send
                    </kbd>
                  </div>
                  <button
                    type="submit"
                    className={`rounded-lg px-4 py-2 flex items-center justify-center transition-all ${
                      prompt.trim()
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-lg"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!prompt.trim() || isLoading}
                  >
                    <SendIcon className="h-4 w-4 mr-1" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                Mentora AI can make mistakes.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AIChabot
