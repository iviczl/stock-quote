import { NextApiRequest, NextApiResponse } from 'next'
import { Quote } from '../../types/quote'

const QUOTE_DATA_KEY = 'Global Quote'
const SYMBOL_KEY = '01. symbol'
const CURRENT_PRICE_KEY = '05. price'
const DAILY_OPEN_PRICE_KEY = '02. open'
const DAILY_HIGHEST_PRICE_KEY = '03. high'
const DAILY_LOWEST_PRICE_KEY = '04. low'
const DAILY_VOLUME_KEY = '06. volume'
const DATE_KEY = '07. latest trading day'
const PREVIOUS_CLOSING_PRICE = '08. previous close'
const PRICE_CHANGE_KEY = '09. change'
const PRICE_CHANGE_PERCENT_KEY = '10. change percent'

const CACHE_VALID = 3600 // 1 hour (because of the one day period of freshness)

export default async (symbol: string): Promise<Quote | null> => {
  const response = (
    await (
      await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`,
        { next: { revalidate: CACHE_VALID } } // runs on server, so next.js cache
      )
    ).json()
  )[QUOTE_DATA_KEY]

  if (!response || !response.hasOwnProperty(SYMBOL_KEY)) {
    return null
  }

  return {
    symbol: response[SYMBOL_KEY],
    currentPrice: response[CURRENT_PRICE_KEY],
    dailyOpenPrice: response[DAILY_OPEN_PRICE_KEY],
    dailyHighestPrice: response[DAILY_HIGHEST_PRICE_KEY],
    dailyLowestPrice: response[DAILY_LOWEST_PRICE_KEY],
    dailyVolume: response[DAILY_VOLUME_KEY],
    date: response[DATE_KEY],
    previousClosingPrice: response[PREVIOUS_CLOSING_PRICE],
    priceChange: response[PRICE_CHANGE_KEY],
    priceChangePercent: response[PRICE_CHANGE_PERCENT_KEY],
  } as Quote
}
