interface ContourFieldProps {
  className?: string
}

export function ContourField({ className = '' }: ContourFieldProps) {
  return (
    <svg
      aria-hidden="true"
      className={`contour-field ${className}`}
      preserveAspectRatio="none"
      viewBox="0 0 1200 700"
    >
      <g className="contour-field__left" fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M-90 574C-9 506 7 390 98 340c75-41 139 7 204-56 62-59 50-151 151-197 72-33 145-14 208-78" />
        <path d="M-73 619C20 550 37 429 126 382c77-41 141 10 209-55 60-58 56-145 149-188 73-34 139-19 207-76" />
        <path d="M-43 661c98-67 121-179 204-226 76-43 140 8 210-57 55-52 60-132 145-174 70-35 132-24 201-73" />
        <path d="M21 700c94-62 125-151 198-194 70-41 132 0 196-52 57-46 66-116 143-157 65-34 124-29 186-67" />
      </g>
      <g className="contour-field__right" fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M1260 53c-87 68-101 167-190 208-75 35-127-17-202 36-67 47-76 132-170 158-77 21-143-12-214 34" />
        <path d="M1270 99c-85 60-107 151-189 190-72 34-126-16-199 34-66 45-80 123-168 150-74 23-139-5-208 36" />
        <path d="M1279 148c-82 53-110 133-184 170-67 34-122-12-192 31-63 39-82 111-164 139-69 23-131 1-195 35" />
        <path d="M1286 204c-77 45-109 113-176 149-61 32-114-7-180 29-58 32-82 95-156 124-63 25-119 8-178 36" />
      </g>
      <g className="contour-field__island" fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M741 579c-32-25-31-74 4-99 43-31 113-18 129 26 14 39-21 79-73 88-24 4-45-1-60-15Z" />
        <path d="M759 560c-22-19-20-53 6-70 32-21 81-11 91 19 9 27-17 54-55 59-17 2-32-1-42-8Z" />
        <path d="M779 542c-12-11-9-31 7-40 20-12 49-5 54 13 5 16-12 31-34 34-11 1-20-1-27-7Z" />
      </g>
    </svg>
  )
}
