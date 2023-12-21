import Link from 'next/link'

export default function HomeLink() {
  return (
    <Link
      href='/'
      className='w-40 h-8 text-center border rounded border-cyan-600 px-2 py-1 hover:bg-gray-200'
    >
      Back
    </Link>
  )
}
