import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const RoomCard = ({ room }) => {
    const [review, setReviews] = useState()
    useEffect(() => {
        const roomsReviews = async () => {
            const getReviews = await fetch(`${import.meta.env.VITE_baseLink}/reviews/${room._id}`)
            const reviewsData = await getReviews.json();
            setReviews(reviewsData)
        }
        roomsReviews()
    },[room?._id])
    // console.log(review)
    return (
        <div>
            <Link to={`/roomDetailsPage/${room._id}`} >
                <div className="h-full card bg-base-100  shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <figure>
                        <img
                            className="object-cover h-[200px] w-full transition-transform duration-300 hover:scale-110"
                            src={room.image}
                            alt={room.name}
                        />
                    </figure>
                    {/* Card Body */}
                    <div className="card-body gap-0">
                        <h2 className="card-title text-primary-color">{room.name}</h2>
                        <p className="text-gray-500">{room.description?.slice(0, 100)}...</p>
                        <p>
                            <strong>Price:</strong> ${room.price}
                        </p>
                        <p>
                            <strong>Rating:</strong> {room.rating}/5
                        </p>
                        <p>
                            <strong>Total Reviews:</strong> <span className="text-lg">{review.length}</span>
                        </p>
                        {/* Highlight Key Features */}
                        {room.features && room.features.length > 0 && (
                            <div className="mt-2">
                                <strong>Features:</strong>
                                <ul className="list-disc ml-5 text-sm">
                                    {room.features.slice(0, 3).map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>
                </div>
            </Link>
        </div>
    );
};

RoomCard.propTypes = {
    room: PropTypes.object.isRequired
}

export default RoomCard;