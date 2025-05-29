import { Mail } from "lucide-react"

const Profile = () => {
  return (
    <div className="py-24 sm:py-16 font-outfit mb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src="/placeholder.svg?height=120&width=120"
                alt="Profile"
                className="w-30 h-30 rounded-full border-4 border-purple-600 shadow-lg"
              />
            </div>
          </div>

          <h2 className="text-base font-semibold leading-7 text-purple-600 cursor-text">
            <span className="underline">Menteera</span>
          </h2>
          <h1 className="mt-2 text-3xl font-manrope font-semibold tracking-tight text-gray-900 sm:text-5xl cursor-text">
            Hemit Patel
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 cursor-text">
            Passionate developer with 5+ years of experience building scalable web applications. I love creating
            beautiful, functional solutions that make a difference.
          </p>

          <div className="flex justify-center items-center gap-2 mt-6 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="cursor-text">alex@example.com</span>
            </div>
        </div>
        <div className="mx-auto mt-8 max-w-2xl sm:mt-20 lg:mt-12 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                  <span className="text-white text-xl">💻</span>
                </div>
                <div className="cursor-text">Technical Skills</div>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 cursor-text">
                React, Next.js, TypeScript, Node.js, Python, PostgreSQL, AWS. Experienced in building modern web
                applications with clean, maintainable code.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <div className="cursor-text">Current Focus</div>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 cursor-text">
                Building AI-powered applications and exploring machine learning integration in web development. Always
                learning new technologies and best practices.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                  <span className="text-white text-xl">🏆</span>
                </div>
                <div className="cursor-text">Achievements</div>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 cursor-text">
                Led development of 3 major product launches, contributed to 50+ open source projects, and mentored 10+
                junior developers.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                  <span className="text-white text-xl">🌱</span>
                </div>
                <div className="cursor-text">Interests</div>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 cursor-text">
                Open source contribution, tech blogging, photography, and hiking. Passionate about using technology to
                solve real-world problems.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Profile;