"use client"

import Button from '@/components/ui/Button';
import Card from '@/components/feature/Dashboard/Card';
import React from 'react'
import { GraduationCap, MessageCircle, MessageSquare, User } from 'lucide-react';
import MotivationBox from '@/components/feature/Dashboard/MotivationBox';
import { useSession } from '@/lib/auth-client';
import Modal from '@/components/feature/Dashboard/Modal';

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between bg-gradient-to-r from-purple-800 via-purple-600 to-purple-500 rounded-2xl w-full h-24 text-white mb-8">
          <div className="flex items-center">
            <div className="rounded-full bg-white w-16 h-16 flex justify-center items-center text-3xl ml-6 mr-4">👋</div>
            <div>
              <p className="text-2xl font-semibold flex">
                {handleGetGreeting()}, {name ? name : "loading..."}!
              </p>
              <p className="text-sm text-purple-100">Explore what Mentora has to offer...</p>
            </div>
          </div>

          <div className="h-full flex items-center pr-6">
            <Button className="flex items-center mr-4">
              <User className="mr-2 w-4 h-4"/> Profile
            </Button>
            <Button variant="filled" className="flex items-center">
              <MessageSquare className="mr-2 w-4 h-4"/> Previous Chats
            </Button>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Quick Actions</h2>
          <p className="text-sm text-gray-600 mb-6">What would you like to do today?</p>
          
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