import { Mail } from "lucide-react"
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import PersonalizationCard from "@/components/feature/Profile/PersonalizationCard";
import { TbTextGrammar } from "react-icons/tb";

const Profile = async () => {

  const session = await auth.api.getSession({
      headers: await headers(),
  });

  return (
    <div className="py-24 sm:py-16 font-outfit mb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={session?.user.image || "/default-profile.png"}
                alt="Profile"
                className="w-30 h-30 rounded-full border-4 border-purple-600 shadow-lg"
              />
            </div>
          </div>

          <h2 className="text-base font-semibold leading-7 text-purple-600 cursor-text">
            <span className="underline">Menteera</span>
          </h2>
          <h1 className="mt-2 text-3xl font-manrope font-semibold tracking-tight text-gray-900 sm:text-5xl cursor-text">
            {session?.user.name}
          </h1>

          <div className="flex justify-center items-center gap-2 mt-6 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="cursor-text">{session?.user.email}</span>
            </div>
        </div>

        <div className="mx-auto max-w-2xl mt-10 mb-4 flex items-center gap-4">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-purple-800 text-lg mb-0.5 tracking-tight">Personalization Overview</span>
            <span className="text-gray-700 text-sm">
              See which feedback types our AI tracks to personalize your experience.
            </span>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-2xl sm:mt-20 lg:mt-12 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <PersonalizationCard
              type={"Grammar"}
              description={"Improve your writing with personalized grammar suggestions."}
              icon={<TbTextGrammar />}
              amountOfOccurance={2}
            />
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Profile;