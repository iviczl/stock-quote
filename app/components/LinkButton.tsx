import Link from 'next/link'

type ButtonProps = {
  href: string
  label?: string
  disabledTitle?: string
  disabled?: boolean
}
export default function LinkButton({
  href,
  label = 'Button',
  disabledTitle = '',
  disabled = false,
}: ButtonProps) {
  return (
    <div
      className='ml-2 flex align-middle'
      title={disabled ? disabledTitle : undefined}
    >
      <Link
        href={href}
        className={
          'w-max h-8 leading-6 text-center align-middle border rounded border-cyan-600 px-2 py-1 hover:bg-gray-200' +
          (disabled ? ' pointer-events-none bg-gray-400' : '')
        }
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
      >
        {label}
      </Link>
    </div>
  )
}
