import { Match } from '../../../types/match'

const MATCHES_KEY = 'bestMatches'
const SYMBOL_KEY = '1. symbol'
const NAME_KEY = '2. name'

export default async (filter: string): Promise<Match[]> => {
  const response = (
    await (
      await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${filter}&apikey=6MAC9AMIYQ93U1CJ`,
        { cache: 'no-store' }
      )
    ).json()
  )[MATCHES_KEY] as []
  // { next: { revalidate: CACHE_VALID }

  if (!response || !response.hasOwnProperty(SYMBOL_KEY)) {
    return [] as Match[]
  }
  return response.map((item) => ({
    symbol: item[SYMBOL_KEY],
    name: item[NAME_KEY],
  }))
}
