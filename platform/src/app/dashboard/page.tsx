"use client"

import Button from '@/components/ui/Button';
import Card from '@/components/feature/Dashboard/Card';
import React from 'react'
import { GraduationCap, MessageCircle, User } from 'lucide-react';
import MotivationBox from '@/components/feature/Dashboard/MotivationBox';
import { useSession } from '@/lib/auth-client';
import Modal from '@/components/feature/Dashboard/Modal';
import Link from 'next/link';

const Dashboard = () => {
  const handleGetGreeting = () => {
    const hour = new Date().getHours();
    return hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";
  };

  const { data: session } = useSession();
  const name = session?.user?.name;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between bg-gradient-to-r from-purple-800 via-purple-600 to-purple-500 rounded-2xl w-full h-auto sm:h-24 text-white mb-8 p-4 sm:p-0">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="rounded-full bg-white w-12 h-12 sm:w-16 sm:h-16 flex justify-center items-center text-2xl sm:text-3xl ml-0 sm:ml-6 mr-3 sm:mr-4">👋</div>
            <div>
              <p className="text-xl sm:text-2xl font-semibold flex">
                {handleGetGreeting()}, {name ? name : "loading..."}!
              </p>
              <p className="text-xs sm:text-sm text-purple-100">Explore what Mentora has to offer...</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row h-full items-center sm:pr-6 gap-2 sm:gap-0">

            <Link href="/profile">
              <Button className="flex items-center mb-2 sm:mb-0 sm:mr-4 w-full sm:w-auto">
                <User className="mr-2 w-4 h-4"/> Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Quick Actions</h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-6">What would you like to do today?</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card
              icon={GraduationCap}
              title="AI Grader"
              description="Use our AI Grader to gain personalized feedback based on your teacher's grading style." 
              type="AI Grader"
            />
            <Card
              icon={MessageCircle}
              title="AI Chatbot"
              description="Chat with our AI to get personalized advice and feedback. It is used with AI Grader and Bias Detection as well."
              type="AI Chatbot"
            />
            <MotivationBox />

            <Modal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;