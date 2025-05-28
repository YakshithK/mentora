"use client"

import { useSession } from "@/lib/auth-client";
import { signOut } from "@/lib/auth-client";
import { ChevronDown, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const NavBar = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const session = useSession();
  const user = session.data?.user;
  const name = user?.name || "Logged Out";
  const avatarUrl = user?.image || "https://www.gravatar.com/avatar/?d=mp";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    if (user) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    await router.push('/')
  }

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">

        <div className="flex items-center">
          <Link href={"/landing"} className="text-xl font-semibold text-purple-900">Mentora</Link>
        </div>

        <div className="relative" ref={dropdownRef}>
          <div
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              user ? 'cursor-pointer hover:bg-gray-50' : ''
            }`}
            onClick={handleProfileClick}
          >
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="block">
              <div className="text-sm font-medium text-gray-900">{name}</div>
            </div>
            {user && (
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            )}
          </div>

          {user && isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <div className="border-t border-gray-100 mt-1">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
