import React from 'react'

const MainHero = () => {
  return (
      <div className="relative">
        <div className="relative isolate px-6 lg:px-8">
          <div className="mx-auto max-w-5xl py-10 md:py-40">
            <div className="text-center flex flex-col items-center font-oufit">
              <div className="flex flex-col gap-y-8 items-center">
                <h1 className="mx-auto max-w-4xl font-display font-outfit font-[600] tracking-tight text-slate-900 eight-title">
                  <span className="inline-block">
                    <span className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r text-bg  drop-shadow-lg tracking-tight">
                      High School
                    </span>
                    <br />
                    <span className="relative whitespace-nowrap">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 418 42"
                        className="absolute top-2/3 left-0 h-[0.65em] w-full fill-blue-400/70"
                        preserveAspectRatio="none"
                      >
                        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                      </svg>
                      <span className="relative px-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent text-6xl md:text-8xl font-extrabold drop-shadow-lg tracking-tight">
                        Made Easier
                      </span>
                    </span>
                  </span>
                </h1>
                <p className="w-2/3 font-outfit text-base md:text-lg leading-8 text-gray-600 cursor-text">
                  Mentora is a platform designed to help high school students improve their assignments ethically and efficiently.
                </p>
                <div className="flex items-center justify-center gap-x-6 transition transform">
                  <div className="h-max w-max rounded-xl bg-black flex justify-center items-center">
                    <div className="relative inline-flex group">
                      <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-purple-500 via-sky-500 to-blue-700 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt" />
                      <div className="p-1 bg-gradient-to-r from-purple-500 via-sky-500 to-blue-700 rounded-xl">
                        <a
                          href="/dashboard"
                          target="_blank"
                          title="Find extracurriculars"
                          className="relative inline-flex font-outfit rounded-lg items-center justify-center px-4 lg:px-6 py-2 text-base font-medium text-black transition-all duration-200 bg-white font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                          role="button"
                        >
                          Go To Dashboard
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-500 to-sky-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
      </div>  )
}

export default MainHero