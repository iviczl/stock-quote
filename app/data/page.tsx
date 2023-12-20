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
        <HomeLink />
        <h1 className='mt-2'>
          There is no data about the chosen stock. ({searchParams.symbol})
        </h1>
      </div>
    )
  }

  return (
    <div className='lg:text-lg md:text-base sm:text-sm xs:text-xs'>
      <HomeLink />
      <h1 className='mt-2'>Stock Data Page</h1>
      <ul className='flex flex-wrap gap-2'>
        <li>Symbol: {data.symbol}</li>
        <li>Current Price: {data.currentPrice}</li>
        <li>Daily Highest Price: {data.dailyHighestPrice}</li>
        <li>Daily Lowest Price: {data.dailyLowestPrice}</li>
        <li>Daily Open Price: {data.dailyOpenPrice}</li>
        <li>Daily Volume: {data.dailyVolume}</li>
        <li>Date: {data.date}</li>
        <li>Previous Closing Price: {data.previousClosingPrice}</li>
        <li>Price Change: {data.priceChange}</li>
        <li>Price Change Percent: {data.priceChangePercent}</li>
      </ul>
    </div>
  )
}
