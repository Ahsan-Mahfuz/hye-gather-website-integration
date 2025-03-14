'use client'
import { Geist, Geist_Mono, Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { Provider } from 'react-redux'
import { store } from '@/redux/main/store'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // const router = useRouter()
  // const pathname = usePathname()
  // const [isLoading, setIsLoading] = useState(true)

  // const protectedRoutes = []

  // useEffect(() => {
  //   const token = Cookies.get('token')

  //   if (!token && protectedRoutes.includes(pathname)) {
  //     router.push('/login')
  //   } else {
  //     setIsLoading(false)
  //   }
  // }, [pathname])

  // if (isLoading) return <div>Loading...</div>

  return (
    <html lang="en">
      <body
        className={`${poppins.variable}  ${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-between  `}
      >
        <Provider store={store}>
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <Toaster />
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
