import React from 'react'
import { promptData } from '@/data/prompt'

const AIGetStarted = () => {
  return (
    <div className='flex flex-col items-center justify-center px-6 py-10'>
      <h1 className="font-bold text-4xl text-gray-800 mb-10">How can I help?</h1>

      <div className='absolute bottom-48 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
        {promptData.map((prompt, index) => (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-sm hover:shadow-md rounded-2xl px-3 py-2 transition-all duration-300 cursor-pointer group flex items-start gap-3">
      <div className="text-blue-500 mt-1">
      {React.createElement(prompt.icon, { color: prompt.iconColor })}
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
          {prompt.boldedText}
        </p>
        <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
          {prompt.greyedText}
        </p>
      </div>
    </div>        ))}
      </div>
    </div>
  )
}

export default AIGetStarted