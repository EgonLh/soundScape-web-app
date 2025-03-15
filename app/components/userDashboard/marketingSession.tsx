"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

export default function SubscribeForm() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSuccess(true)
            setEmail("")

            // Reset success message after 3 seconds
            setTimeout(() => setIsSuccess(false), 3000)
        }, 1500)
    }

    return (
        <div className="w-full w-full rounded bg-white p-6 border">
            <div className="mb-4 text-center">
                <h3 className="mb-1 text-xl font-bold text-gray-800">Stay Updated</h3>
                <p className="text-sm text-gray-500">Subscribe to our newsletter for the latest updates and offers</p>
            </div>

            {isSuccess ? (
                <div className="flex items-center justify-center rounded-lg bg-green-50 p-4 text-green-700">
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Thanks for subscribing!</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="relative">
                    <div className="relative overflow-hidden rounded-lg">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group absolute right-1.5 top-1/2 -translate-y-1/2 transform overflow-hidden rounded-md px-4 py-1.5 font-medium text-white"
                        >
                            {/* Animated background */}
                            <div className="absolute inset-0 -z-10 animate-gradient-x bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-[length:200%_100%]"></div>

                            <span className="flex items-center">
                {isSubmitting ? (
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                ) : (
                    <>
                        Subscribe
                        <Send className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                )}
              </span>
                        </button>
                    </div>
                </form>
            )}

            <div className="mt-4 text-center text-xs text-gray-500">We respect your privacy. Unsubscribe at any time.</div>
        </div>
    )
}

