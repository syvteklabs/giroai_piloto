import Image from 'next/image'

export function LogoGiro({ width = 220, height = 65 }: { width?: number; height?: number }) {
  return (
    <Image
      src="https://giroaihub.com/logo-giroai.png"
      alt="Giro AI Logo"
      width={width}
      height={height}
      priority
    />
  )
}
