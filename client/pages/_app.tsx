import { cache } from '@emotion/css'
import { CacheProvider } from '@emotion/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import GlobalStyles from './../styles/GlobalStyles'
import './../styles/index.css'
import { Footer } from '../src/components'

const App = ({ Component, pageProps }: AppProps | any) => (
  <CacheProvider value={cache}>
    <GlobalStyles />
    <Head>
      <title>Trait Surfer</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta
        name="description"
        content="Want to find the best NFT to buy on Ethereum? Find the best ranked NFT within a collection. Our website provides a rarity tool to rank your NFT's based on their traits. Find out more here. "
      />
    </Head>
    <Component {...pageProps} />
    <Footer />
  </CacheProvider>
)

export default App
