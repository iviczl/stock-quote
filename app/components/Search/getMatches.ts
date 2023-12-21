import { Match } from '../../../types/match'

const MATCHES_KEY = 'bestMatches'
const SYMBOL_KEY = '1. symbol'
const NAME_KEY = '2. name'

export default async (filter: string): Promise<Match[]> => {
  const response = (
    await (
      await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${filter}&apikey=6MAC9AMIYQ93U1CJ`,
        { cache: 'force-cache' } //runs on client, so browser cache
      )
    ).json()
  )[MATCHES_KEY] as []
  console.log('response', response)
  if (!response || response.length === 0) {
    return [] as Match[]
  }
  return response.map((item) => ({
    symbol: item[SYMBOL_KEY],
    name: item[NAME_KEY],
  })) as Match[]
}
