"use client"

import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import { ChatMessage } from "./chat-message";
import { useEffect, useRef, useState } from "react";
import { mockChatHistory, mockLegalDocuments } from "@/lib/mock-data";

export default function ChatInterface(
    {
        leftSidebarOpen, 
        setLeftSidebarOpen, 
        rightSidebarOpen, 
        setRightSidebarOpen
    } : 
    {
        leftSidebarOpen: boolean,
        setLeftSidebarOpen: (isOpen: boolean) => void,
        rightSidebarOpen: boolean,
        setRightSidebarOpen: (isOpen: boolean) => void
    }
) {

    useEffect(() => {
        console.log(messages)
    })

    const [messages, setMessages] = useState<any[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [relatedDocuments, setRelatedDocuments] = useState<any[]>([]);
    const [chatHistory, setChatHistory] = useState<any[]>([]);
    const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);

    // Set initial messages on the client side to avoid hydration mismatch
      useEffect(() => {
        setMessages([
          {
            id: 1,
            role: "assistant",
            content: "Hello! I'm your AI legal assistant. How can I help you with legal information today?",
            timestamp: new Date().toISOString(),
          },
        ]);
        setChatHistory(mockChatHistory);
        setRelatedDocuments(mockLegalDocuments);
      }, []);
    
    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
    
        const userMessage = {
          id: messages.length + 1,
          role: "user",
          content: input,
          timestamp: new Date().toISOString(),
        };
    
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);
    
        setTimeout(() => {
          let responseContent = "I'll need to research that further. Could you provide more details?";
    
          const legalKeywords = [
            { term: "IPC", response: "The Indian Penal Code (IPC) is the official criminal code of India." },
            { term: "section 302", response: "Section 302 of the IPC deals with punishment for murder." },
            { term: "divorce", response: "Divorce laws in India vary based on religion and personal laws." },
            { term: "property", response: "Property laws in India are governed by various acts including the Transfer of Property Act." },
            { term: "corruption", response: "Corruption in India is addressed through the Prevention of Corruption Act, 1988." },
          ];
    
          for (const keyword of legalKeywords) {
            if (input.toLowerCase().includes(keyword.term.toLowerCase())) {
              responseContent = keyword.response;
              const filteredDocs = mockLegalDocuments.filter(
                (doc) =>
                  doc.title.toLowerCase().includes(keyword.term.toLowerCase()) ||
                  doc.description.toLowerCase().includes(keyword.term.toLowerCase())
              );
              setRelatedDocuments(filteredDocs.length > 0 ? filteredDocs : mockLegalDocuments.slice(0, 3));
              break;
            }
          }
    
          const assistantMessage = {
            id: messages.length + 2,
            role: "assistant",
            content: responseContent,
            timestamp: new Date().toISOString(),
          };
    
          setMessages((prev) => [...prev, assistantMessage]);
          setIsLoading(false);
          setRightSidebarOpen(true);
    
          setChatHistory((prev) => [
            {
              id: prev.length + 1,
              title: input.length > 30 ? input.substring(0, 30) + "..." : input,
              date: new Date().toISOString(),
              messages: [...messages, userMessage, assistantMessage],
              tags: [],
              bookmarked: false,
            },
            ...prev,
          ]);
        }, 1500);
      };

  return (
    <div className="z-0 flex flex-1 flex-col h-full w-full overflow-y-auto">
        <div className="relative flex  w-full flex-col">
            {/* Toggle Left Sidebar Button */}
            <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-48 z-10 shadow-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            >
                {leftSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                <span className="sr-only">Toggle History</span>
            </Button>

            {/* Toggle Right Sidebar Button */}
            <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-48 z-10 shadow-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            >
                {rightSidebarOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                <span className="sr-only">Toggle Documents</span>
            </Button>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 pb-16">
                <div className="mx-auto max-w-3xl space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                    >
                    <h2 className="text-3xl font-bold mb-2">
                        Hello <span className="text-primary animate-pulse">User</span>
                    </h2>
                    <p className="text-muted-foreground max-w-md">
                        Ask me anything about legal information, IPC sections, or government guidelines. I'm here to help.
                    </p>
                </motion.div>
                {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} isSpeechEnabled={isSpeechEnabled} />
                ))}
                {isLoading && (
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 animate-pulse rounded-full bg-primary/20"></div>
                        <div className="space-y-2">
                            <div className="h-4 w-24 animate-pulse rounded bg-primary/20"></div>
                            <div className="h-4 w-64 animate-pulse rounded bg-primary/10"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>

        {/* Input */}
        <div className="w-full border-t bg-background p-4">
            <form onSubmit={handleSendMessage} className="mx-auto flex max-w-3xl items-center gap-2">
            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about legal information..."
                className="flex-1"
                disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-5 w-5" />
                <span className="sr-only">Send</span>
            </Button>
            </form>
        </div>
        </div>
    </div>
  )
}
