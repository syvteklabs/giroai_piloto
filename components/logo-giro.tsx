export function LogoGiro({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <circle cx="32" cy="32" r="24" stroke="#F51B2B" strokeWidth="3" fill="none" />
      <circle cx="32" cy="32" r="6" fill="#10BFB5" />
    </svg>
  )
}
