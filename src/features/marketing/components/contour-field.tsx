interface ContourFieldProps {
  className?: string
}

export function ContourField({ className = '' }: ContourFieldProps) {
  return (
    <svg
      aria-hidden="true"
      className={`contour-field ${className}`}
      viewBox="0 0 900 520"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M-68 455C21 405 50 299 139 270c84-28 139 35 221-15 75-46 78-139 178-168 90-27 169 15 260-55" />
        <path d="M-37 491C58 438 84 340 170 311c82-27 139 31 219-16 72-43 82-128 175-157 86-27 160 12 248-48" />
        <path d="M12 520c92-49 124-132 202-162 77-29 133 22 207-18 69-37 85-113 170-144 79-28 149 5 229-45" />
      </g>
    </svg>
  )
}
