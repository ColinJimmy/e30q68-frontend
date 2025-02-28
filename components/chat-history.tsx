"use client"

import { useState } from "react"
import { BookmarkIcon, MessageSquare, Tag, Trash } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ChatHistoryProps {
  chats: {
    id: number
    title: string
    date: string
    messages: any[]
    tags: string[]
    bookmarked: boolean
  }[]
  onToggleBookmark: (id: number) => void
  onAddTag: (id: number, tag: string) => void
}

export function ChatHistory({ chats, onToggleBookmark, onAddTag }: ChatHistoryProps) {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null)
  const [newTag, setNewTag] = useState("")

  const handleAddTag = () => {
    if (selectedChatId && newTag.trim()) {
      onAddTag(selectedChatId, newTag.trim())
      setNewTag("")
    }
  }

  if (chats.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
        <MessageSquare className="mb-2 h-10 w-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No chat history found</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {chats.map((chat) => (
        <motion.div
          key={chat.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm">
            <CardHeader className="p-3">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-medium">{chat.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-6 w-6", chat.bookmarked ? "text-yellow-500" : "text-muted-foreground")}
                  onClick={() => onToggleBookmark(chat.id)}
                >
                  <BookmarkIcon className="h-4 w-4" />
                  <span className="sr-only">{chat.bookmarked ? "Remove bookmark" : "Bookmark"}</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">{new Date(chat.date).toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              {chat.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {chat.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between p-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setSelectedChatId(chat.id)}>
                    <Tag className="h-3.5 w-3.5" />
                    <span className="sr-only">Add tag</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Tag</DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Enter tag name" />
                    <Button onClick={handleAddTag} disabled={!newTag.trim()}>
                      Add
                    </Button>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <div className="flex flex-wrap gap-1">
                      {chat.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <Trash className="h-3.5 w-3.5" />
                <span className="sr-only">Delete</span>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

