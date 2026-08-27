export function GiroLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Red circle arc */}
      <path
        d="M100 30C158.66 30 170 70 170 100C170 140 158.66 170 100 170C80 170 60 160 50 145"
        stroke="#FF2851"
        strokeWidth="24"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Teal dot */}
      <circle cx="100" cy="80" r="12" fill="#1AB5A8" />
      {/* Small red accent */}
      <rect x="165" y="160" width="15" height="8" fill="#FF2851" />
    </svg>
  )
}
