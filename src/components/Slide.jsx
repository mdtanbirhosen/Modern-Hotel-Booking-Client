/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const Slide = ({ image, title, description }) => {
  return (
    <div
      className='w-full bg-center bg-cover h-[350px] md:h-[450px] lg:h-[38rem]'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='flex items-center justify-center w-full h-full bg-gray-900/70'>
        <div className='text-center'>
          <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
            {title}
          </h1>
          <br />
          <p className='font-semibold text-white mb-5'>{description}</p>
          <Link
            to='/rooms'
            className=" font-semibold text-primary-color bg-white px-7 py-3 rounded-xl  border-2 hover:bg-primary-color hover:text-white "
          >
            Explore All Rooms
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Slide
