"use client"

import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { useSession } from '@/lib/auth-client';
import React from 'react'
import { BiChat, BiUser } from 'react-icons/bi';

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
  const name = session.data?.user.name

  return (
    <div className="max-w-screen p-5">
      <div className="flex justify-between bg-gradient-to-r from-purple-800 via-purple-600 to-purple-500 rounded-2xl w-full h-24 text-white">

        <div className="flex items-center">
          <div className="rounded-full bg-white w-16 h-16 flex justify-center items-center text-3xl ml-3 mr-3">👋</div>
          <div>
            {session.isPending ? (
              <Spinner />
            ) : (
              <p className="text-2xl font-semibold">
                {handleGetGreeting()}, {name || 'Guest'}!
              </p>
            )}
            <p className="text-sm text-gray-300">Explore what Mentora has to offer...</p>
          </div>
        </div>

        <div>
            <div className="h-full flex items-center">
              <Button className="flex items-center mr-4">
                <BiUser className="mr-2 text-lg"/> Profile
              </Button>
              <Button variant="filled" className='flex items-center'>
                <BiChat className="mr-2 text-lg"/> Previous Chats
              </Button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard