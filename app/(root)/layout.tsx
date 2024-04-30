import StreamProvider from '@/Providers/StreamClientProviders'
import { Metadata } from 'next';
import React, { Children } from 'react'

export const metadata: Metadata = {
  title: "ZOOM",
  description: "Video Calling App",
  icons: {
    icon: '/icons/logo.svg'
  }
};

const RootLayout = ({ children }:{ children: React.ReactNode}) => {
  return (
    <main>
      <StreamProvider>
      {children}
      </StreamProvider>
    
    </main>
  )
}

export default RootLayout
