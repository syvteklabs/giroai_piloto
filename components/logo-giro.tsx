export function LogoGiro({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Red outer circle with break */}
      <path
        d="M32 8C18.7 8 8 18.7 8 32C8 45.3 18.7 56 32 56C45.3 56 56 45.3 56 32C56 18.7 45.3 8 32 8ZM32 16C41.9 16 50 24.1 50 34C50 41.5 45.8 48 40 51.4V12.6C45.8 16 50 22.5 50 30C50 39.9 41.9 48 32 48C22.1 48 14 39.9 14 30C14 22.5 18.2 16 24 12.6V51.4C18.2 48 14 41.5 14 34C14 24.1 22.1 16 32 16Z"
        fill="#F51B2B"
      />

      {/* Turquoise dot in center */}
      <circle cx="32" cy="32" r="6" fill="#10BFB5" />
    </svg>
  )
}
