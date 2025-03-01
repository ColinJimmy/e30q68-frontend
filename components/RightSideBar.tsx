import { motion } from "framer-motion";
import React from "react";
import { DocumentPreview } from "./document-preview";

interface RelatedDocument {
    id: number;
    title: string;
    description: string;
    content: string;
    type: string;
    date: string;
}

export default function RightSideBar({ relatedDocuments }: { relatedDocuments: RelatedDocument[] }) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 450, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16 border-l bg-muted/40 h-full overflow-y-scroll z-10"
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
  );
}
