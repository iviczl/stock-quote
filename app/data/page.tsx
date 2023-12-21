import LinkButton from '@/components/LinkButton'
import getData from './getData'
import HomeLink from '@/components/HomeLink'

export default async function Data({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  const data = await getData(searchParams.symbol || '')

  if (!data) {
    return (
      <div className='lg:text-lg md:text-base sm:text-sm xs:text-xs'>
        <LinkButton href='/' label='Back' />
        <h1 className='mt-2'>
          There is no data about the chosen stock. ({searchParams.symbol})
        </h1>
      </div>
    )
  }

  return (
    <div className='lg:text-lg md:text-base sm:text-sm xs:text-xs px-2'>
      <LinkButton href='/' label='Back' />
      <h1 className='mt-2'>Stock Data of {data.symbol}</h1>
      <ul className='flex flex-wrap gap-2 ml-2'>
        <li className='text-center border rounded border-yellow-600 px-2 py-1'>
          Symbol: {data.symbol}
        </li>
        <li className='text-center border rounded border-yellow-600 px-2 py-1'>
          Current Price: {data.currentPrice}
        </li>
        <li className='text-center border rounded border-yellow-600 px-2 py-1'>
          Daily Highest Price: {data.dailyHighestPrice}
        </li>
        <li className='text-center border rounded border-yellow-600 px-2 py-1'>
          Daily Lowest Price: {data.dailyLowestPrice}
        </li>
        <li className='text-center border rounded border-yellow-600 px-2 py-1'>
          Daily Open Price: {data.dailyOpenPrice}
        </li>
        <li className='text-center border rounded border-yellow-600 px-2 py-1'>
          Daily Volume: {data.dailyVolume}
        </li>
        <li className='text-center border rounded border-yellow-600 px-2 py-1'>
          Date: {data.date}
        </li>
        <li className='text-center border rounded border-yellow-600 px-2 py-1'>
          Previous Closing Price: {data.previousClosingPrice}
        </li>
        <li className='text-center border rounded border-yellow-600 px-2 py-1'>
          Price Change: {data.priceChange}
        </li>
        <li className='text-center border rounded border-yellow-600 px-2 py-1'>
          Price Change Percent: {data.priceChangePercent}
        </li>
      </ul>
    </div>
  )
}
