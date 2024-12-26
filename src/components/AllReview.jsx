import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Review from "./Review"; // Assuming you have the Review component

const AllReview = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const getReviews = await fetch(`${import.meta.env.VITE_baseLink}/reviews`);
                const reviewsData = await getReviews.json();
                
                // Sort reviews in descending order of their timestamp
                const sortedReviews = reviewsData.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                setReviews(sortedReviews);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchRoomDetails();
    }, []);

    // Settings for the react-slick carousel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="max-w-4xl w-full mx-auto my-10 overflow-hidden">
            <h2 className="text-3xl font-bold text-center mb-6">What Our Users Say</h2>
            {reviews.length > 0 ? (
                <Slider {...settings}>
                    {reviews.map((review) => (
                        <div key={review._id} className="p-4">
                            <Review review={review} />
                        </div>
                    ))}
                </Slider>
            ) : (
                <p className="text-center text-gray-500">No reviews available at the moment.</p>
            )}
        </div>
    );
};

export default AllReview;
