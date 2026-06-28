import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "How does Learnly work?",
    answer: "Simply upload your study documents, and our AI will automatically generate comprehensive summaries, flashcards, and quizzes. You can also ask questions about your materials using our study assistant."
  },
  {
    question: "What file formats are supported?",
    answer: "Currently, we support PDF files. We're working on adding support for more formats including DOCX, TXT, and images in the near future."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, absolutely. We use industry-standard encryption to protect your data. Your documents and study materials are stored securely and are only accessible by you."
  },
  {
    question: "Can I try Learnly for free?",
    answer: "Yes! We offer a free plan that allows you to upload up to 3 documents. This lets you experience the core features before deciding to upgrade."
  },
  {
    question: "How accurate is the AI?",
    answer: "Our AI is highly accurate and continuously improving. It uses advanced natural language processing to understand and extract key concepts from your documents."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. There are no long-term commitments, and you'll retain access until the end of your billing period."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="relative w-full py-24 bg-black">
      <div className="max-w-3xl mx-auto px-6 w-full">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-zinc-400">
            Everything you need to know about Learnly
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-all"
              >
                <span className="text-lg font-medium text-white pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5 text-zinc-400 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
