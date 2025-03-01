"use client"

import ChatInterface from "@/components/ChatInterface";
import Header from "@/components/Header";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import { mockLegalDocuments } from "@/lib/mock-data";
import { useEffect, useState } from "react";

export default function Chat() {

    const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

    const [relatedDocuments, setRelatedDocuments] = useState<any[]>([]);

    useEffect(() => {
        setRelatedDocuments(mockLegalDocuments);
    }, [])

  return (
    <div className="relative flex h-dvh w-dvw flex-col overflow-y-hidden bg-background">
        <Header />
        <div className="flex flex-row">
            {leftSidebarOpen && <LeftSideBar />}
            <div className="w-screen flex overflow-hidden">
                <ChatInterface leftSidebarOpen={leftSidebarOpen} rightSidebarOpen={rightSidebarOpen} setLeftSidebarOpen={setLeftSidebarOpen} setRightSidebarOpen={setRightSidebarOpen} />
            </div>
            {rightSidebarOpen && <RightSideBar relatedDocuments={relatedDocuments} />}
        </div>
    </div>
  )
}
