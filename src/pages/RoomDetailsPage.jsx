import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { format } from "date-fns";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";

const RoomDetailsPage = () => {
    const { user } = useContext(AuthContext)
    const { id } = useParams();

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
                setReviews(data.reviews || []);
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };
        fetchRoomDetails();
    }, [id]);

    const { name, image, description, features, availability, price, rating } = room;

    // Handle Booking Confirmation
    // Handle Booking Confirmation
    const handleBooking = async () => {
        if (!bookingDate) {
            toast.error("Please select a booking date.");
            return;
        }

        const bookingDetails = {
            roomId: id,
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


    return (
        <div>
            {/* Room Details */}
            <div className="md:flex gap-5">
                <div>
                    <img src={image} alt={name} />
                </div>
                <div className="w-1/2 space-y-4">
                    <h2 className="flex items-center text-3xl font-bold text-primary-color">
                        {name}{" "}
                        <span
                            className={`ml-3 text-base badge ${availability ? "bg-green-400" : "bg-red-400"
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
                    <button
                        onClick={() => setShowModal(true)}
                        disabled={!availability}
                        className={`font-semibold text-lg ${availability ? "text-primary-color" : "text-gray-400"
                            }`}
                    >
                        Book Now
                    </button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold">Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-md my-2">
                            <p>
                                <strong>Rating:</strong> {review.rating}/5
                            </p>
                            <p>
                                <strong>Comment:</strong> {review.comment}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No reviews available for this room.</p>
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
        </div>
    );
};

export default RoomDetailsPage;
