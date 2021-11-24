import Head from 'next/head'
import Header from '../Components/Header'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { /* Header */ }
      <Header />
      { /* Banner */ }
    </div>
  )
}
