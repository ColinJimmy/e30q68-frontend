"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Send, Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChatMessage } from "@/components/chat-message";
import { DocumentPreview } from "@/components/document-preview";
import { ChatHistory } from "@/components/chat-history";
import { LanguageSelector } from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { mockChatHistory, mockLegalDocuments } from "@/lib/mock-data";
import Header from "@/components/Header";

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [relatedDocuments, setRelatedDocuments] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    const toggleBookmark = (id: number) => {
    setChatHistory((prev) => prev.map((chat) => (chat.id === id ? { ...chat, bookmarked: !chat.bookmarked } : chat)))
  }

  const addTag = (id: number, tag: string) => {
    setChatHistory((prev) =>
      prev.map((chat) => (chat.id === id && !chat.tags.includes(tag) ? { ...chat, tags: [...chat.tags, tag] } : chat)),
    )
  }

  return (
    <div className="relative flex h-dvh w-dvw flex-col overflow-y-hidden bg-background">

      <Header />

      {/* Main Content */}
      <div className="flex flex-1 h-dvh w-dvw overflow-y-hidden">
        {/* Left Sidebar - Chat History */}
        <AnimatePresence initial={false}>
          {leftSidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-r bg-muted/40 h-dvh overflow-y-scroll z-10"
            >
              <div className="flex h-full flex-col">
                <div className="p-4">
                  <h2 className="mb-2 text-lg font-semibold">Chat History</h2>
                  <Tabs defaultValue="all">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
                      <TabsTrigger value="tagged">Tagged</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-2">
                      <ChatHistory chats={chatHistory} onToggleBookmark={toggleBookmark} onAddTag={addTag} />
                    </TabsContent>
                    <TabsContent value="bookmarked" className="mt-2">
                      <ChatHistory
                        chats={chatHistory.filter((chat) => chat.bookmarked)}
                        onToggleBookmark={toggleBookmark}
                        onAddTag={addTag}
                      />
                    </TabsContent>
                    <TabsContent value="tagged" className="mt-2">
                      <ChatHistory
                        chats={chatHistory.filter((chat) => chat.tags.length > 0)}
                        onToggleBookmark={toggleBookmark}
                        onAddTag={addTag}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="z-0 flex flex-1 flex-col h-full w-full overflow-y-hidden">
          <div className="relative flex flex-1 w-full flex-col overflow-y-hidden">
            {/* Toggle Left Sidebar Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-4 z-10 shadow-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            >
              {leftSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              <span className="sr-only">Toggle History</span>
            </Button>

            {/* Toggle Right Sidebar Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-4 z-10 shadow-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            >
              {rightSidebarOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              <span className="sr-only">Toggle Documents</span>
            </Button>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mx-auto max-w-3xl space-y-4">
                {messages.length === 1 && (
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
                )}
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
            <div className="fixed bottom-0 left-0 w-full border-t bg-background p-4">
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

        {/* Right Sidebar - Related Documents */}
        <AnimatePresence initial={false}>
          {rightSidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 350, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-l bg-muted/40 h-dvh overflow-y-scroll z-10"
            >
              <div className="flex h-full flex-col">
                <div className="p-4">
                  <h2 className="mb-4 text-lg font-semibold">
                    Related <span className="text-primary">Legal</span> Documents
                  </h2>
                  <div className="space-y-4">
                    {relatedDocuments.map((doc) => (
                      <DocumentPreview key={doc.id} document={doc} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
