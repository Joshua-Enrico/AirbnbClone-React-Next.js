import Image from "next/image"
function Header() {
    return (
        <header>
            {/* Left */}
            <div className='relative flex items-center h-10'>
                <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
                />
            </div>

            {/* Midle */}
            <div></div>
            {/* Right */}
            <div></div>
        </header>
    )
}

export default Header
