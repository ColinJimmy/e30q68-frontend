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
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-red-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
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
                  AI Legal Assistant with{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 animate-gradient">
                    RAG Technology
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
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
                  Our platform helps you navigate through{" "}
                  <span className="text-red-500 font-medium">legal documents</span>,{" "}
                  <span className="text-blue-500 font-medium">IPC sections</span>, and{" "}
                  <span className="text-green-500 font-medium">government guidelines</span> with ease.
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
                    <Button className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary to-purple-600 px-8 py-6 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                      <span className="relative z-10 flex items-center gap-2">
                        Get Started
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Legal Protection</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Get insights on your legal rights and protections under various laws and regulations.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1" />
                    <path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1" />
                    <path d="M12 18v-7" />
                    <path d="M8 13v5" />
                    <path d="M16 13v5" />
                    <path d="M9 21h6" />
                    <path d="M4 8h16" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Government Transparency</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Question government initiatives and detect potential corruption in public projects.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Multilingual Support</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Access legal information in multiple languages with our advanced localization features.
                  </p>
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

