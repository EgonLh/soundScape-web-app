"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion"

// Define the data structure for our FAQ items
type QuestionType = {
    question: string
    answer: string
}

type SessionType = {
    title: string
    description: string
    questions: QuestionType[]
}

// Sample data
const faqData: SessionType[] = [
    {
        title: "Getting Started",
        description: "Basic information about Orders",
        questions: [
            {
                question: "How do I create accesss order?",
                answer:
                    "Phone to delivery",
            },
            {
                question: "Cancellation",
                answer:
                    "Yes! We offer a 14-day free trial for all new users. During this period, you'll have access to all premium features. No credit card is required to start your trial. At the end of the trial period, you can choose to subscribe to one of our plans or continue with the free basic version.",
            },
        ],
    },
]

export default function FAQAccordion() {
    return (
        <div className="w-full max-w-3xl mx-auto p-6 border flex flex-col justify-between ">
            <h2 className="text-2xl font-bold text-start mb-2">Information About Orders</h2>

            <div className="space-y-4">
                {faqData.map((session, index) => (
                    <SessionAccordion key={index} session={session} />
                ))}
            </div>
        </div>
    )
}

function SessionAccordion({ session }: { session: SessionType }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300">
            {/* Session Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full p-4 text-left bg-white hover:bg-gray-50 transition-all duration-300"
            >
                <div>
                    <h3 className="font-medium text-lg">{session.title}</h3>
                    <p className="text-sm text-gray-500">{session.description}</p>
                </div>
                <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Session Content with Questions */}
            {isOpen && (
                <div className="border-t border-gray-200 bg-gray-50 p-4 transition-all duration-300">
                    <Accordion type="single" collapsible className="space-y-2">
                        {session.questions.map((item, qIndex) => (
                            <AccordionItem
                                key={qIndex}
                                value={`question-${qIndex}`}
                                className="border border-gray-200 rounded-md bg-white overflow-hidden"
                            >
                                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 hover:no-underline">
                                    <div className="flex items-center text-left">
                                        <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                            <span className="text-sm font-medium">Q{qIndex + 1}</span>
                                        </div>
                                        <span className="text-sm font-medium">{item.question}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4 pt-1 text-sm text-gray-600">
                                    <div className="ml-9">{item.answer}</div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            )}
        </div>
    )
}

