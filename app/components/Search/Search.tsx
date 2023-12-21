'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import { Match } from '../../../types/match'
import getMatches from './getMatches'
import LinkButton from '../LinkButton'

export default function Search() {
  const [filter, setFilter] = useState('')
  const [matchSelected, setMatchSelected] = useState(false)
  const { isLoading, error, data } = useQuery<Match[]>({
    queryKey: ['matches', filter],
    queryFn: async () => await getMatches(filter),
    staleTime: Infinity,
  })

  const filterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.toLowerCase()
    setFilter(value)
    setMatchSelected(false)
  }

  const selectMatch = (symbol: string) => {
    setFilter(symbol)
    setMatchSelected(true)
  }

  const matchItem = (item: Match) => {
    return (
      <li
        className='overflow-clip hover:bg-gray-100 cursor-pointer'
        onClick={() => selectMatch(item.symbol)}
        key={item.symbol}
      >
        <span>{item.symbol}</span>&nbsp;
        <span className='whitespace-nowrap text-gray-400'>{item.name}</span>
      </li>
    )
  }

  return (
    <div className='flex row self-center lg:text-lg md:text-base sm:text-sm xs:text-xs'>
      <div className='flex flex-col relative'>
        <input
          type='text'
          value={filter}
          onChange={filterChange}
          className='w-min h-8 px-1 border rounded border-b-gray-400 placeholder-shown:border-gray-200'
          placeholder='Type a stock symbol'
        />
        {!matchSelected && (
          <ul className='absolute left-1 top-8 flex flex-col flex-nowrap'>
            {data && data.map((item) => matchItem(item))}
          </ul>
        )}
      </div>
      <LinkButton
        disabled={!matchSelected}
        href={`/data?symbol=${filter}`}
        label='Get stock quote'
        disabledTitle='You need to select a stock from the match list before you can get its quote data.'
      />
      {/* <div
        className='ml-2 flex align-middle'
        title={
          !matchSelected
            ? 'You need to select a stock from the match list before you can get its quote data.'
            : undefined
        }
      >
        <Link
          href={`/data?symbol=${filter}`}
          className={
            'w-40 h-8 text-center border rounded border-cyan-600 px-2 py-1 hover:bg-gray-200' +
            (!matchSelected ? ' pointer-events-none bg-gray-400' : '')
          }
          aria-disabled={!matchSelected}
          tabIndex={!matchSelected ? -1 : undefined}
        >
          Get stock quote
        </Link>
      </div> */}
    </div>
  )
}
