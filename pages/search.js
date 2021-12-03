import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { useRouter } from 'next/router';
import { format } from "date-fns"
import InfoCards from '../components/Infocards/InfoCard';
import InfoCard from '../components/Infocards/InfoCard';


function Search({ searchResults }) {
    console.log(searchResults)
    const router = useRouter();

    // ES6 destructuring
    const { location, startDate, endDate, nOfGuests } = router.query;

    const formattedStarDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy")
    const range = `${formattedStarDate} - ${formattedEndDate}`

    return (
        <div >
            <Header
                placeholder={`${location} | ${range} | ${nOfGuests}`}
                FLAG={1} />
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ Stays - {range} - for {nOfGuests} number of guests</p>

                    <h1 className="text-3xl font-semibold  nb-6">Stays in {location}</h1>

                    <div className="hidden lg:inline-flex mt-2 mb-5 space-x-3
                    text-gray-800 whitespace-nowrap">
                        <p className="filter-button">Cancellation Flexibility</p>
                        <p className="filter-button">Type of Place</p>
                        <p className="filter-button">Price</p>
                        <p className="filter-button">Rooms and Beds</p>
                        <p className="filter-button">More filters</p>
                    </div>
                    <div className="flex flex-col">
                        {searchResults.map(({ img, location, title, description, star, price, total }) => (
                            <InfoCard
                                key={img}
                                img={img}
                                location={location}
                                title={title}
                                description={description}
                                star={star}
                                price={price}
                                total={total}
                            />
                        ))}
                    </div>

                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Search

export async function getServerSideProps() {
    const searchResults = await fetch("https://air-bn-b-api-nextjs.vercel.app/api/searchs")
        .then(res => res.json());
    return {
        props: {
            searchResults,
        },
    };


}