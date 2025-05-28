import React from 'react'

const AIChatbot = () => {
  return (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">AI Chatbot</h3>
                                <p className="text-sm text-gray-500">Intelligent conversation assistant</p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Our AI Chatbot provides intelligent, context-aware responses to help you with various tasks. 
                            From answering questions to providing detailed explanations, it's designed to assist you efficiently.
                        </p>
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <strong>Features:</strong> Natural language processing, context awareness, multi-topic support
                            </p>
                        </div>
                    </div>  )
}

export default AIChatbot