"use client"

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import { useSession } from '@/lib/auth-client';
import React from 'react'
import { BiChat, BiUser } from 'react-icons/bi';
import { GraduationCap, Users, MessageCircle } from 'lucide-react';

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

      <div className="mt-8 mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Quick Actions</h2>
        <p className="text-sm text-gray-600">What would you like to do today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
        <Card
          icon={GraduationCap}
          title="AI Grader"
          description="Use our AI Grader to gain personalized feedback based on your teacher's grading style." 
          onOpenClick={() => console.log('Open AI Grader')}        
          />
        <Card
          icon={MessageCircle}
          title="AI Chatbot"
          description="Chat with our AI to get personalized advice and feedback. It is used with AI Grader and Bias Detection as well."
          onOpenClick={() => console.log('Open AI Chatbot')}
        />
      </div>  

      <div>
          
      </div>  
      </div>
  )
}

export default Dashboard