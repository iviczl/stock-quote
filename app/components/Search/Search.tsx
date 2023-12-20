'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import { Match } from '../../../types/match'
import getMatches from './getMatches'
// 6MAC9AMIYQ93U1CJ

export default function Search() {
  const [filter, setFilter] = useState('IBM')
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery<Match[]>({
    queryKey: ['matches'], //, filter
    queryFn: async () => await getMatches(filter),
    initialData: [],
    staleTime: Infinity,
  })

  const filterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value)
    queryClient.invalidateQueries({ queryKey: ['matches'] })
    console.log(e.currentTarget.value)
  }

  const matchItem = (item: Match) => {
    console.log('matchitem')
    return (
      <li>
        <span>{item.symbol}</span>
        <span>{item.name}</span>
      </li>
    )
  }

  return (
    <div className='flex row'>
      <div className='flex column'>
        <input
          type='text'
          value={filter}
          onChange={filterChange}
          className='border rounded border-b-gray-400 placeholder-shown:border-gray-200 px-1'
          placeholder='Type a stock symbol'
        />
        <ul>{data.map((item) => matchItem(item))}</ul>
      </div>
      <Link
        href={`/data?symbol=${filter}`}
        className='border rounded border-cyan-600 px-1 py-1 hover:bg-gray-200 ml-2'
      >
        Get stock quote
      </Link>
    </div>
  )
}
