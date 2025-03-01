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
    // setRelatedDocuments(mockLegalDocuments);
  }, []);

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

    const response = await fetch("http://127.0.0.1:5000/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: input }),
    });

    const data = await response.json();

    console.log("Answer: ", data.answer);
    console.log("Sources: ", data.sources);

    setTimeout(() => {
      let responseContent = data.answer || "I'll need to research that further. Could you provide more details?";
      let shouldOpenSidebar = false;

      // Store sources as related documents
      const relatedDocs = data.sources?.map((source: any, index: number) => ({
        id: index + 1,
        title: `Source ${index + 1}`,
        description: source.content,
        page: source.page || "Unknown",
        source: source.source || "Unknown",
      })) || [];

      setRelatedDocuments(relatedDocs);

      if (relatedDocs.length > 0) {
        shouldOpenSidebar = true;
      }

      const assistantMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: responseContent,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);

      if (shouldOpenSidebar) {
        setRightSidebarOpen(true);
      }

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

      setRightSidebarOpen(true);
    }, 1500);
  };


  const toggleBookmark = (id: number) => {
    setChatHistory((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, bookmarked: !chat.bookmarked } : chat))
    );
  };

  const addTag = (id: number, tag: string) => {
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === id && !chat.tags.includes(tag) ? { ...chat, tags: [...chat.tags, tag] } : chat
      )
    );
  };

  return (
    <div className="relative flex h-dvh w-dvw flex-col overflow-hidden bg-background">
      <div className="z-50 relative">
        <Header />
      </div>

      <div className="flex flex-1 overflow-hidden pt-[64px] relative">
        {/* Left Sidebar */}
        <AnimatePresence initial={false}>
          {leftSidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 top-0 h-full border-r bg-muted/40 overflow-y-auto z-40"
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
        <div className={`flex-1 relative h-full overflow-hidden transition-all duration-300
          ${leftSidebarOpen ? 'ml-[300px]' : ''}
          ${rightSidebarOpen ? 'mr-[350px]' : ''}`}>
          
          {/* Toggle Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="group fixed left-4 top-[76px] z-40 shadow-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
          >
            {leftSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            
            {/* Tooltip on hover */}
            <span className="absolute left-full top-full mt-2 -translate-x-1/2 scale-0 rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
              Toggle History
            </span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="group fixed right-4 top-[76px] z-50 shadow-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          >
            {rightSidebarOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            <span className="absolute right-0 top-full mt-2 scale-0 rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">Toggle Documents</span>
          </Button>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 h-[calc(100vh-180px)]">
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
          <div className="absolute bottom-0 left-0 right-0 border-t bg-background p-4">
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

        {/* Right Sidebar */}
        <AnimatePresence initial={false}>
          {rightSidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 350, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 top-0 h-full border-l bg-muted/40 overflow-y-auto z-40"
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
  );
}
