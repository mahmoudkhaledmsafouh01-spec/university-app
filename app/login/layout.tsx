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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
