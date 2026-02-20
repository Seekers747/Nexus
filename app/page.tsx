import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">Nexus</h1>
      <p className="text-lg text-gray-500">AI-Powered Knowledge Base</p>
      <div className="flex gap-4">
        <Link
          href="/sign-in"
          className="rounded-full bg-foreground px-6 py-2 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="rounded-full border border-solid border-black/[.08] px-6 py-2 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
        >
          Sign Up
        </Link>
      </div>
    </main>
  )
}
