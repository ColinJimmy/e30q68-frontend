"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { ChevronLeft, Volume2, VolumeX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { LanguageSelector } from './language-selector';
import { ThemeToggle } from './theme-toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Toggle } from './ui/toggle';

export default function Header() {

    const router = useRouter();
    const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);

  return (
      <header className="sticky top-0 left-0 w-dvw h-16 border-b px-4 py-3 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back to Home</span>
            </Button>
            <h1 className="text-xl font-bold">
              AI <span className="text-primary">Legal</span> Assistant
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Toggle
                    aria-label="Toggle text-to-speech"
                    pressed={isSpeechEnabled}
                    onPressedChange={setIsSpeechEnabled}
                  >
                    {isSpeechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle text-to-speech</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>
  )
}
