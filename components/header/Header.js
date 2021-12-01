import Image from "next/image"
import { SearchIcon, UsersIcon, MenuIcon, UserCircleIcon, GlobeAltIcon } from '@heroicons/react/solid'
import { useEffect, useState, useRef } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useClickAway } from "react-use";


function Header() {
    const [searchInput, setSearchInput] = useState('')
    const [expand, setExpand] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [nOfGuests, setNOfGuests] = useState(1)

    function HandleClose(value) {
        setSearchInput(value)
        setExpand(1)
    }


    const ref = useRef(null)
    useClickAway(ref, () => {
        console.log('closing')
        setExpand('')
        ResponsiveBar();

    });

    
    const resetInput = () => {
        setSearchInput('')
        setExpand('')
    }


    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }
    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    useEffect(() => {
        window.onscroll = function () {
            ResponsiveBar();
        }
        if (expand) {
            add()
        } else {
            if (
                document.documentElement.scrollTop < 10
            ) {
                del()
            }
        }
    })



    function add() {
        const header = document.querySelector('#header')
        const SearchIcon = document.querySelector('#searchIcon')
        const Bhost = document.querySelector('#Bhost')
        const GlobeIcon = document.querySelector('#globeIcon')
        const MenuIcon = document.querySelector('#menuIcon')
        const UserIcon = document.querySelector('#userIcon')
        header.classList.remove('p-8')
        header.classList.add('p-5')
        header.classList.remove("bg-transparent");
        header.classList.add("bg-white");
        header.classList.add("shadow-md");
        SearchIcon.classList.remove("text-gray-50");
        SearchIcon.classList.add("text-gray-500");
        SearchIcon.classList.remove("placeholder-gray-50");
        SearchIcon.classList.add("placeholder-gray-500");
        Bhost.classList.remove("text-gray-50");
        Bhost.classList.add("text-gray-500");
        GlobeIcon.classList.remove("text-gray-50");
        GlobeIcon.classList.add("text-gray-500");
        MenuIcon.classList.remove("text-gray-50");
        MenuIcon.classList.add("text-gray-500");
        UserIcon.classList.remove("text-gray-50");
        UserIcon.classList.add("text-gray-500");


    }

    function del() {
        const header = document.querySelector('#header')
        const SearchIcon = document.querySelector('#searchIcon')
        const Bhost = document.querySelector('#Bhost')
        const GlobeIcon = document.querySelector('#globeIcon')
        const MenuIcon = document.querySelector('#menuIcon')
        const UserIcon = document.querySelector('#userIcon')
        header.classList.remove('p-5')
        header.classList.add('p-8')
        header.classList.add("bg-transparent");
        header.classList.remove("bg-white");
        header.classList.remove("shadow-md");
        SearchIcon.classList.remove("text-gray-500");
        SearchIcon.classList.add("text-gray-50");
        SearchIcon.classList.add("text-gray-50");
        SearchIcon.classList.remove("placeholder-gray-500");
        SearchIcon.classList.add("placeholder-gray-50");
        Bhost.classList.remove("text-gray-500");
        Bhost.classList.add("text-gray-50");
        GlobeIcon.classList.remove("text-gray-500");
        GlobeIcon.classList.add("text-gray-50");
        MenuIcon.classList.remove("text-gray-500");
        MenuIcon.classList.add("text-gray-50");
        UserIcon.classList.remove("text-gray-500");
        UserIcon.classList.add("text-gray-50");


    }

    function ResponsiveBar() {
        const header = document.querySelector('#header')
        if (
            (header && document.body.scrollTop > 80) ||
            document.documentElement.scrollTop > 10
        ) {
            if (!expand) {
                add()
            }
        } else {
            if (!expand) {
                del()
            }
        }

    }


    return (
        <header id="header" className='fixed w-full top-0 
        z-50 grid grid-cols-3  
        shadow-md p-8 md:px-10 transform duration-300 px-8' >

            {/* Left */}
            <div className='relative flex 
            items-center h-10 cursor-pointer 
            my-auto'>
                <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>

            {/* Middle - Search  */}
            <div className='flex items-center 
            md:border-2 rounded-full py-2 
            md:shadow-sm'>

                <input value={searchInput} onClick={(event) => setExpand(1)} onChange={(event) => HandleClose(event.target.value)}
                    id="searchIcon" className='flex-grow 
                pl-5 bg-transparent 
                outline-none text-sm 
                text-gray-50 
                placeholder-gray-50'
                    type='text'
                    placeholder='Start Your Search' />

                <SearchIcon className='hidden md:inline-flex 
                h-8 bg-red-400 text-gray-50 rounded-full
                p-2 cursor-pointer md:mx-2'/>
            </div>
            {/* Right */}
            <div className='flex items-center
            space-x-4 justify-end text-gray-500'>
                <p id="Bhost" className='hidden md:inline cursor-pointer text-gray-50' >Become a host</p>

                <GlobeAltIcon id="globeIcon" className='cursor-pointer h-6 text-gray-50' />

                <div className='flex items-center 
                space-x-2 p-2 rounded-full border-2
                cursor-pointer'>
                    <MenuIcon id="menuIcon" className='h-5 text-gray-50' />
                    <UserCircleIcon id="userIcon" className='h-5 text-gray-50' />
                </div>
            </div>
            {(expand) && (<div ref={ref} className="absolute top-[290px] left-1/2 transform -translate-x-1/2 -translate-y-1/2" >
                <DateRangePicker
                    className="tansition duration-500"
                    ranges={[selectionRange]}
                    minDate={new Date()}
                    rangeColors={['#FD5B61']}
                    onChange={handleSelect}
                />
                <div className='flex items-center border-b  bg-white rounded-t-[20px] mt-[5px]'>

                    <h2 className="text-2xl pl-2 flex-grow font-semibold">
                        Number Of Guests
                    </h2>
                    <UsersIcon className=" h-5" />
                    <input value={nOfGuests} onChange={event => setNOfGuests(event.target.value)} className="w-12 pl-2  mr-5 text-lg
                    outline-none text-red-400" min={1} type="number" />
                </div>

                <div className="flex bg-white rounded-b-[20px]">
                    <button onClick={resetInput} className="flex-grow text-gray-500 p-2">Cancel</button>
                    <button className="flex-grow text-red-400">Search</button>
                </div>
            </div>
            )}
        </header>
    )
}

export default Header
