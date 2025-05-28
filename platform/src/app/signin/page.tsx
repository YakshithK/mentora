"use client"

import { signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

const GoogleSignInPage = () => {

  return (
      <div className="flex h-screen justify-center items-center bg-gray-100">
        <div className="w-96 bg-white shadow-lg p-6 rounded-2xl">
          <div className="text-center">
              <button
                onClick={() => signIn.social({
                  provider: "google"
                })}
                className="mt-4 w-full bg-white text-black py-2 px-4 rounded hover:bg-gray-100 flex justify-center items-center gap-2 border border-gray-300"
              >
                <FcGoogle size={24} /> Sign in with Google
              </button>
          </div>
        </div>
      </div>
  );
};

export default GoogleSignInPage;
