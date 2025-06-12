import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="form-main">
      <Component {...pageProps} />
    </main>
  )
}
