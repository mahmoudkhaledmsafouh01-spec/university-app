export const metadata = {
  title: 'University App Login',
  description: 'Sign in to access the University System dashboard.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md rounded-xl bg-white/80 p-8 shadow-lg backdrop-blur">
          {children}
        </div>
      </div>
    </div>
  )
}
