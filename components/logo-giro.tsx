import Image from 'next/image'

export function LogoGiro({ size = 40 }: { size?: number }) {
  return (
    <Image
      src="https://giroaihub.com/logo-giroai.png"
      alt="Giro AI Logo"
      width={size}
      height={size}
      priority
    />
  )
}
