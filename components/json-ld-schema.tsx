import { ReactNode } from 'react'

interface JsonLdSchemaProps {
  data: object
}

export function JsonLdSchema({ data }: JsonLdSchemaProps): ReactNode {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

interface MultipleJsonLdSchemaProps {
  schemas: object[]
}

export function MultipleJsonLdSchema({ schemas }: MultipleJsonLdSchemaProps): ReactNode {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  )
}
