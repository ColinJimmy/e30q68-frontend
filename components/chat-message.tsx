"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: {
    id: number
    role: "user" | "assistant"
    content: string
    timestamp: string
  }
  isSpeechEnabled: boolean
}

export function ChatMessage({ message, isSpeechEnabled }: ChatMessageProps) {
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Highlight legal terms in the message
  const highlightLegalTerms = (text: string) => {
    const legalTerms = [
      { term: "IPC", color: "text-red-500" },
      { term: "section", color: "text-blue-500" },
      { term: "court", color: "text-green-500" },
      { term: "law", color: "text-purple-500" },
      { term: "legal", color: "text-yellow-600" },
      { term: "crime", color: "text-red-600" },
      { term: "lawyer", color: "text-blue-600" },
      { term: "judge", color: "text-green-600" },
      { term: "rights", color: "text-purple-600" },
      { term: "penalty", color: "text-orange-500" },
      { term: "punishment", color: "text-red-500" },
      { term: "divorce", color: "text-pink-500" },
      { term: "property", color: "text-teal-500" },
      { term: "corruption", color: "text-red-700" },
    ]

    let highlightedText = text

    legalTerms.forEach(({ term, color }) => {
      const regex = new RegExp(`\\b${term}\\b`, "gi")
      highlightedText = highlightedText.replace(regex, `<span class="${color} font-medium">$&</span>`)
    })

    return highlightedText
  }

  // Text-to-speech functionality
  useEffect(() => {
    if (isSpeechEnabled && message.role === "assistant") {
      speechRef.current = new SpeechSynthesisUtterance(message.content)
      speechRef.current.rate = 1
      window.speechSynthesis.speak(speechRef.current)
    }

    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel()
      }
    }
  }, [message.content, isSpeechEnabled, message.role])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
      className={cn(
        "flex items-start gap-3 rounded-lg p-4",
        message.role === "assistant" ? "bg-muted/50" : "bg-background",
      )}
    >
      {message.role === "assistant" ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
          <Avatar className="h-8 w-8 border">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
            <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
          </Avatar>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-muted"
        >
          <User className="h-5 w-5" />
        </motion.div>
      )}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{message.role === "assistant" ? "AI Legal Assistant" : "You"}</p>
          <span className="text-xs text-muted-foreground">{new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="prose prose-sm dark:prose-invert"
          dangerouslySetInnerHTML={{
            __html: highlightLegalTerms(message.content)
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold **text**
              .replace(/\n/g, '<br>'), // Handle new lines
          }}
        />
      </div>
    </motion.div>
  )
}

