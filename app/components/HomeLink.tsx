import Link from 'next/link'

export default function HomeLink() {
  return (
    <Link
      href='/'
      className='border rounded border-cyan-600 px-1 py-1 hover:bg-gray-200'
    >
      Back
    </Link>
  )
}
