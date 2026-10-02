interface ContourFieldProps {
  className?: string
}

export function ContourField({ className = '' }: ContourFieldProps) {
  return (
    <svg
      aria-hidden="true"
      className={`contour-field ${className}`}
      viewBox="0 0 420 420"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M214 38C300 34 378 98 380 190c3 107-79 198-181 192C103 376 35 301 39 211 43 119 115 42 214 38Z" />
        <path d="M215 65c70-3 136 50 139 126 4 88-63 165-147 165-78 0-137-61-140-137-3-78 60-151 148-154Z" />
        <path d="M217 94c55-4 108 39 111 99 4 69-48 130-114 133-63 3-113-45-118-106-5-63 48-121 121-126Z" />
        <path d="M219 124c42-4 82 29 85 75 4 52-36 99-86 103-49 4-89-33-94-80-5-49 37-93 95-98Z" />
        <path d="M220 154c29-3 58 20 61 52 3 36-25 69-61 72-35 3-64-23-67-56-4-35 27-65 67-68Z" />
        <path d="M220 184c17-2 35 12 37 31 2 21-15 40-36 42-20 2-37-13-39-33-2-20 16-38 38-40Z" />
      </g>
    </svg>
  )
}

