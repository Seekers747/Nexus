import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await currentUser()
  if (!user) {
    redirect('/sign-in')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Welcome to Nexus</h1>
      <p className="text-gray-500">Logged in as: {user?.emailAddresses[0].emailAddress}</p>
      <UserButton />
    </main>
  )
}
