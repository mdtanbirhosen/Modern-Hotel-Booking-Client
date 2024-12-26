import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { format } from "date-fns";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import Review from "../components/Review";
import axios from "axios";
import Rating from 'react-rating-stars-component';

const RoomDetailsPage = () => {
    const { user } = useContext(AuthContext)
    const { id } = useParams();
    const [newRating, setNewRating] = useState(0);
    const [comment, setComment] = useState('');
    const [room, setRoom] = useState({});
    const [reviews, setReviews] = useState([]);
    const [bookingDate, setBookingDate] = useState("");
    const [showModal, setShowModal] = useState(false);

    // Fetch room details and reviews
    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_baseLink}/roomDetails/${id}`
                );
                const data = await response.json();
                setRoom(data);

                if (response.ok) {
                    const getReviews = await fetch(`${import.meta.env.VITE_baseLink}/reviews/${id}`)
                    const reviewsData = await getReviews.json();
                    setReviews(reviewsData)
                    console.log(reviewsData)
                }

            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };
        fetchRoomDetails();
    }, [id]);

    const { name, image, description, features, availability, price, rating } = room;

    // Handle Booking Confirmation
    const handleBooking = async () => {
        if (!bookingDate) {
            toast.error("Please select a booking date.");
            return;
        }

        const bookingDetails = {
            roomId: room._id,
            userEmail: user?.email,
            bookingDate,
            price,
            image,
            name,
        };

        try {
            // Send booking details to the server
            const response = await fetch(`${import.meta.env.VITE_baseLink}/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingDetails),
            });

            if (response.ok) {
                // Update the room availability in the database
                const updateAvailabilityResponse = await fetch(
                    `${import.meta.env.VITE_baseLink}/rooms/${id}/availability`,
                    {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ availability: false }),
                    }
                );

                if (updateAvailabilityResponse.ok) {
                    toast.success("Room booked successfully!");
                    setShowModal(false);
                    setRoom((prev) => ({ ...prev, availability: false })); // Update availability locally
                } else {
                    toast.error("Failed to update room availability.");
                }
            } else {
                toast.error("Failed to book room.");
            }
        } catch (error) {
            console.error("Error booking room:", error);
            toast.error("An error occurred. Please try again.");
        }
    };


    // get review if user logged in and booked the room
    const handleGetReview = async () => {
        if (user?.email) {
            try {
                // Fetch bookings for the logged-in user
                const getBookingsData = await axios.get(
                    `${import.meta.env.VITE_baseLink}/bookings/?email=${user?.email}`,
                    { withCredentials: true }
                );

                // Check if the roomId from bookings matches the current room's id
                const bookings = getBookingsData.data;
                const matchingBooking = bookings.find((booking) => booking.roomId === id);

                if (matchingBooking) {
                    // after all formalities of rating
                    const handleSubmitReview = async () => {
                        if (!newRating || !comment) {
                            toast.error('Please provide a rating and comment.');
                            return;
                        }


                        // Get the current date and time
                        const reviewDate = new Date().toISOString();

                        try {
                            const response = await fetch(`${import.meta.env.VITE_baseLink}/reviews`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    bookingId: matchingBooking?._id,
                                    roomId: id,
                                    username: user?.displayName,
                                    rating,
                                    comment,
                                    date: reviewDate, // Include the date
                                }),
                            });

                            if (response.ok) {
                                toast.success('Review added successfully!');
                                document.getElementById('my_modal_1').close()
                            } else {
                                throw new Error('Failed to add review');
                            }
                        } catch (error) {
                            console.error('Error submitting review:', error);
                            toast.error('Failed to submit review.');
                        }
                    };
                    handleSubmitReview()
                } else {
                    toast.error("Please book a room for giving review.");
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        } else {
            toast.error('Please Log in first');
        }
    };




    return (
        <div>
            {/* Room Details */}
            <div className="md:flex gap-5 bg-white p-2 md:p-5 rounded-lg mx-2">
                <div className=" md:w-1/2">
                    <img
                        className="rounded-lg"
                        src={image} alt={name} />
                </div>
                <div className="w-1/2 space-y-4">
                    <h2 className="md:flex items-center text-3xl font-bold text-primary-color ">
                        {name}
                        <span
                            className={`md:ml-3 text-base badge ${availability ? "bg-green-400" : "bg-red-400"
                                }`}
                        >
                            {availability ? "Available" : "Not Available"}
                        </span>
                    </h2>
                    <p>
                        <strong>Description:</strong> {description}
                    </p>
                    <p>
                        <strong>Rating:</strong> {rating}
                    </p>
                    <p>
                        <strong>Price:</strong> ${price}
                    </p>
                    <div>
                        <h3>
                            <strong>Features:</strong>
                        </h3>
                        <ul className="list-disc ml-6 text-secondary-color font-medium">
                            {features?.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                    {user ?
                        <button
                            onClick={() => setShowModal(true)}
                            disabled={!availability}
                            className={`font-semibold text-lg ${availability ? " font-semibold hover:text-primary-color hover:bg-white px-7 py-3 rounded-xl  border-2 bg-primary-color text-white" : "text-gray-400 font-semibold  hover:bg-white px-7 py-3 rounded-xl  border-2 bg-primary-color "
                                }`}
                        >
                            Book Now
                        </button> :
                        <Link to={'/authenticationPage'}>
                            <button
                                className={`font-semibold hover:text-primary-color hover:bg-white px-7 py-3 rounded-xl  border-2 bg-primary-color text-white ${availability ? "text-primary-color" : "text-gray-400"
                                    }`}
                            >
                                Book Now
                            </button></Link>}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-10">
                <h2 className="text-3xl font-semibold text-center">Reviews</h2>
                {reviews.length > 0 ? (
                    <div>

                        {reviews.map((review) => (
                            <Review key={review._id} review={review}></Review>
                        ))}
                        <div className="mt-3">
                            <button onClick={() => document.getElementById('my_modal_1').showModal()} className="font-semibold hover:text-primary-color hover:bg-white px-7 py-3 rounded-xl  border-2 bg-primary-color text-white">Get Review</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-gray-500">No reviews available for this room.</h3>
                        <p>Give us review</p>
                        <p>1. At first You have to login</p>
                        <p>2. Then Book the room </p>
                        <p>3. Go to My bookings page</p>
                        <p>4. Click on Review button </p>
                        <p>5. Write your feedback </p>
                        <div>
                            <button onClick={() => document.getElementById('my_modal_1').showModal()} className="font-semibold hover:text-primary-color hover:bg-white px-7 py-3 rounded-xl  border-2 bg-primary-color text-white">Get Review</button>
                        </div>
                    </div>

                )}
            </div>










            {/* Booking Modal */}
            {showModal && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm Booking</h3>
                        <p className="py-4">
                            <strong>Room:</strong> {name}
                        </p>
                        <p>
                            <strong>Price:</strong> ${price}
                        </p>
                        <p>
                            <strong>Description:</strong> {description}
                        </p>
                        <div className="mt-4">
                            <label htmlFor="bookingDate" className="font-medium">
                                Booking Date:
                            </label>
                            <input
                                type="date"
                                id="bookingDate"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                className="block border border-gray-300 rounded-md p-2 mt-2 w-full"
                            />
                        </div>
                        <div className="modal-action">
                            <button onClick={handleBooking} className="btn btn-primary">
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </dialog>
            )}



            {/* review modal */}

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h2 className="text-xl font-bold mb-4">Submit a Review</h2>
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Username</label>
                        <input
                            type="text"
                            value={user?.displayName}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Rating</label>
                        <Rating
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                            value={newRating}
                            onChange={(rat) => setNewRating(rat)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Comment</label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="modal-action">
                        <button onClick={() => document.getElementById('my_modal_1').close()} className="btn btn-secondary mr-2">
                            Cancel
                        </button>
                        <button onClick={handleGetReview} className="btn btn-primary">
    Submit
</button>


                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default RoomDetailsPage;
