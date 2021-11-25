import Head from 'next/head'
import Banner from '../components/banner/Banner'
import MediumCard from '../components/cardsdata/MediumCard'
import Header from '../components/header/Header'
import SmallCard from '../components/nearbycomponents/SmallCard'
import { useHorizontalScroll } from "../components/functions/scroll"
import LargeCard from '../components/nearbycomponents/LargeCard'
import Footer from '../components/footer/Footer'

export default function Home({ exploreData, cardsData, largeCard }) {
  const scrollRef = useHorizontalScroll();
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />

      <main className='max-w-7xl mx-auto px-8 sm:px-16' >
        <section className='pt-6'>
          {/* Pull some data from api endpoint */}
          <h2 className='text-4xl font-semibold pb-5' >Explore Nearby</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          xl:grid-cols-4' >
            {exploreData?.map(({ img, location, distance }) => (
              <SmallCard
                key={img}
                img={img}
                location={location}
                distance={distance}
              />
            ))}</div>
        </section>
        <section>
          <h2 className="text-4xl font-semibold py-8">
            Live Anywere
          </h2>
          <div ref={scrollRef} className="flex space-x-3 overflow-scroll 
          scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({ img, title }) => (
              <MediumCard
                key={img}
                img={img}
                title={title}
              />
            ))}
          </div>
        </section>
        <LargeCard
          img={largeCard.img}
          title={largeCard.title}
          description={largeCard.description}
          buttonText={largeCard.buttonText}
        />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
// Get Custom Data from Api
export async function getStaticProps() {
  const exploreData = await fetch('https://air-bn-b-api-nextjs-781s3m466-yoyogold-a11.vercel.app/api/locations').
    then(
      (response) => response.json()
    )
  const cardsData = await fetch('https://air-bn-b-api-nextjs-781s3m466-yoyogold-a11.vercel.app/api/cards').
    then(response => response.json())

  const largeCard = await fetch('https://air-bn-b-api-nextjs-781s3m466-yoyogold-a11.vercel.app/api/largecard').
    then(response => response.json())
  return {
    props: {
      exploreData,
      cardsData,
      largeCard
    }
  }
}
// https://links.papareact.com/pyp
// https://jsonkeeper.com/b/VHHT