'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Search from './components/Search/Search'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const App = () => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Search />
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  )
}

export default App
