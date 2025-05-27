"use client"

import { useSession } from '@/lib/auth-client';
import React from 'react'

const Dashboard = () => {

  const handleGetGreeting = (): string => {
    const hour = new Date().getHours();
    return hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";
  };

  const session = useSession()

  return (
    <div className="max-w-screen p-5">
      <div className="flex justify-between bg-gradient-to-r from-purple-800 via-purple-600 to-purple-500 rounded-2xl w-full h-24 text-white">

        <div className="flex items-center">
          <div className="rounded-full bg-white w-16 h-16 flex justify-center items-center text-4xl ml-3 mr-3">👋</div>
          <div>
            <p className="font-bold text-lg">{handleGetGreeting()} {session.data?.user.name}!</p>
            <p className="text-sm text-gray-300">Explore what Mentora has to offer...</p>
          </div>
        </div>

        <div>
          <button></button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard