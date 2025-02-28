"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DocumentPreviewProps {
  document: {
    id: number
    title: string
    description: string
    content: string
    type: string
    date: string
  }
}

export function DocumentPreview({ document }: DocumentPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Highlight legal terms in the document content
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  document.type === "IPC"
                    ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    : document.type === "Act"
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
                )}
              >
                <FileText className="h-4 w-4" />
              </motion.div>
              <CardTitle className="text-sm font-medium">{document.title}</CardTitle>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {document.type} • {new Date(document.date).toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className="px-4 pb-2">
          <p className="text-sm text-muted-foreground">{document.description}</p>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 max-h-40 overflow-y-auto rounded border p-2 text-xs"
                dangerouslySetInnerHTML={{
                  __html: highlightLegalTerms(document.content),
                }}
              />
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between p-2">
          <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" /> Show Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" /> View Content
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

