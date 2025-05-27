import LandingPage from '@/components/feature/Landing-Page/Page'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import React from 'react'

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // Use Next.js headers() function
  })

  if (session) {
    redirect('/dashboard')
  }

  return (
    <LandingPage />
  )
}

export default HomePage