// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'


const slides = [
    {
        id: 1,
        title: "Welcome to Hotel Booking Platform",
        description: "Explore luxury rooms tailored for your comfort and style.",
        image: "https://www.hotelcontractbeds.co.uk/media/3183/hotel-room.jpg?width=1200&height=630&mode=stretch",
        
    },
    {
        id: 2,
        title: "Discover Exclusive Offers",
        description: "Book now and enjoy special discounts for your stay.",
        image: "https://media.istockphoto.com/id/174767532/photo/hotel-room.jpg?s=612x612&w=0&k=20&c=2BCNeFcX5PGzCxfZKXewhI_y2C9R7Jw_tzVYCXmRRCE=",
        
    },
    {
        id: 3,
        title: "Experience Comfort and Elegance",
        description: "Relax and rejuvenate in our premium rooms and suites.",
        image: "https://www.oppeinhome.com/upload/images/ueditor/20240411/modern-oak-wood-apartment-hotel-bedroom-furniture-set.webp",
        
    },
];

const Banner = () => {
    return (
        <div className='pb-10'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className='mySwiper'
            >
                {
                    slides.map(slide=><SwiperSlide key={slide.id}>
                        <Slide
                        title={slide.title}
                        description={slide.description}
                        image={slide.image}
                        />
                    </SwiperSlide>)
                }
                
                
            </Swiper>
        </div>
    );
};

export default Banner;