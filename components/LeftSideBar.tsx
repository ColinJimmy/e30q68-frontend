import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ChatHistory } from "./chat-history";
import { useState } from "react";

export default function LeftSideBar() {

    const [chatHistory, setChatHistory] = useState<any[]>([]);

    const toggleBookmark = (id: number) => {
      setChatHistory((prev) => prev.map((chat) => (chat.id === id ? { ...chat, bookmarked: !chat.bookmarked } : chat)))
    }

    const addTag = (id: number, tag: string) => {
        setChatHistory((prev) =>
        prev.map((chat) => (chat.id === id && !chat.tags.includes(tag) ? { ...chat, tags: [...chat.tags, tag] } : chat)),
        )
    }

  return (
    <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 450, opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className=" pt-16 border-r bg-muted/40 h-full overflow-y-scroll z-0"
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
  )
}
