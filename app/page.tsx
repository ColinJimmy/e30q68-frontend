"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          {/* Background animation elements */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  My Lawyer
                </h1>
                <p className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark animate-gradient">AI Legal Advisor</p>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl dark:text-gray-400">
                  Get accurate, authorized legal information and clarifications without the need for initial in-person
                  consultations.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-2"
              >
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
                  Our platform helps you navigate through <span className="text-primary font-medium">legal documents</span>,
                  <span className="text-primary font-medium"> IPC sections</span>, and <span className="text-primary font-medium">government guidelines</span> with ease.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full max-w-sm space-y-2 pt-4"
              >
                <div className="flex justify-center">
                  <Link href="/chat">
                    <Button className="bg-blue-600 relative overflow-hidden rounded-lg px-8 py-6 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105">
                      <span className=" relative w-full h-full z-10 flex items-center gap-2">
                        Get Started
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © 2025 AI Legal Assistant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
