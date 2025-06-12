import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="font-sans text-base bg-[var(--background)] text-[var(--font-color)]">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
