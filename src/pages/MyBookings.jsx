import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../provider/AuthProvider';
import ReactModal from 'react-modal';
import Rating from 'react-rating-stars-component';
import { TbMapCancel } from "react-icons/tb";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { MdOutlineUpdate } from "react-icons/md";
import moment from 'moment';
const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentBookingId, setCurrentBookingId] = useState(null);
    const [currentRoomId, setCurrentRoomId] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const baseURL = import.meta.env.VITE_baseLink;

    useEffect(() => {
        // Fetch user's bookings
        const fetchBookings = async () => {
            try {
                const response = await fetch(`${baseURL}/bookings/?email=${user?.email}`);
                const data = await response.json();
                setBookings(data || []);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                toast.error('Failed to fetch bookings.');
            }
        };
        fetchBookings();
    }, [baseURL, user?.email]);

    const handleCancel = async (id, updateTo, bookingDate) => {
        // Parse the booking date
        const bookingMoment = moment(bookingDate, 'YYYY-MM-DD');
        const currentMoment = moment(); // Current date and time
        const cancelDeadline = bookingMoment.subtract(1, 'days'); // 1 day before the booking date
    
        // Check if the current date is past the allowed cancellation deadline
        if (currentMoment.isAfter(cancelDeadline)) {
            toast.error('You can only cancel bookings at least 1 day before the booking date.');
            return;
        }
    
        const confirm = window.confirm('Are you sure you want to cancel this booking?');
        if (!confirm) return;
    
        try {
            const deleteBooking = await fetch(`${baseURL}/bookings/${id}`, {
                method: 'DELETE',
            });
    
            if (deleteBooking.ok) {
                // Update room availability to true
                const updateAvailabilityResponse = await fetch(
                    `${import.meta.env.VITE_baseLink}/rooms/${updateTo}/availability`,
                    {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ availability: true }),
                    }
                );
    
                if (updateAvailabilityResponse.ok) {
                    setBookings((prev) => prev.filter((booking) => booking?._id !== id));
                    toast.success('Booking canceled successfully!');
                }
            } else {
                throw new Error('Failed to delete booking');
            }
        } catch (error) {
            console.error('Error canceling booking:', error);
            toast.error('Failed to cancel booking.');
        }
    };

    const openReviewModal = (id, roomId) => {
        setCurrentBookingId(id);
        setRating(0);
        setComment('');
        setShowModal(true);
        setCurrentRoomId(roomId)
    };

    const handleSubmitReview = async () => {
        if (!rating || !comment) {
            toast.error('Please provide a rating and comment.');
            return;
        }

        // Get the current date and time
        const reviewDate = new Date().toISOString();

        try {
            const response = await fetch(`${baseURL}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId: currentBookingId,
                    roomId: currentRoomId,
                    username: user?.displayName,
                    rating,
                    comment,
                    date: reviewDate, // Include the date
                }),
            });

            if (response.ok) {
                toast.success('Review added successfully!');
                setShowModal(false);
            } else {
                throw new Error('Failed to add review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review.');
        }
    };


    const handleUpdateDate = async (id) => {
        const newDate = prompt('Enter the new booking date (YYYY-MM-DD):');
        if (!newDate) return;

        try {
            const response = await fetch(`${baseURL}/bookings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookingDate: newDate }),
            });

            if (response?.ok) {
                setBookings((prev) =>
                    prev.map((booking) =>
                        booking?._id === id ? { ...booking, bookingDate: newDate } : booking
                    )
                );
                toast.success('Booking date updated successfully!');
            } else {
                throw new Error('Failed to update date');
            }
        } catch (error) {
            console.error('Error updating date:', error);
            toast.error('Failed to update booking date.');
        }
    };

    return (
        <div className=" ">
            <h1 className="text-2xl font-bold text-center mb-6">My Bookings</h1>
            {bookings?.length === 0 ? (
                <p className="text-center text-gray-500">You have no bookings yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full bg-white rounded-lg shadow-md">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th>#</th>
                                <th className='md:flex hidden'>Image</th>
                                <th>Room Name</th>
                                <th>Price</th>
                                <th>Booking Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={booking._id} className="hover:bg-gray-100">
                                    <td className=''>{index + 1}</td>
                                    <td className='md:flex hidden'>
                                        <img
                                            src={booking?.image}
                                            alt={booking?.roomName || 'Room'}
                                            className="w-16 h-16 rounded-lg"
                                        />
                                    </td>
                                    <td>{booking?.name || 'No Name'}</td>
                                    <td>${booking?.price || 'N/A'}</td>
                                    <td>{booking?.bookingDate || 'Not Specified'}</td>
                                    <td className='pr-0'>
                                        <div>
                                            <button
                                                onClick={() => handleCancel(booking._id, booking.roomId, booking.bookingDate)}
                                                className="btn btn-error btn-sm mr-2"
                                            >
                                                <TbMapCancel className='md:hidden flex' />
                                                <span className='md:flex hidden'>Cancel</span>
                                            </button>

                                            <button
                                                onClick={() => handleUpdateDate(booking?._id)}
                                                className='btn btn-info btn-sm mr-2'>

                                                <MdOutlineUpdate className='md:hidden flex' />
                                                <span className='md:flex hidden'>Update Date</span>

                                            </button>
                                            <button
                                                onClick={() => openReviewModal(booking._id, booking.roomId)}
                                                className="btn btn-success btn-sm"
                                            >
                                                <TfiCommentsSmiley className='md:hidden flex' />
                                                <span className='md:flex hidden'>Review</span>

                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Review Modal */}
            <ReactModal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                ariaHideApp={false}
                className="bg-white p-6 rounded-lg shadow-md w-96 mx-auto mt-20"
            >
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
                        value={rating}
                        onChange={(newRating) => setRating(newRating)}
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
                <div className="flex justify-end">
                    <button onClick={() => setShowModal(false)} className="btn btn-secondary mr-2">
                        Cancel
                    </button>
                    <button onClick={handleSubmitReview} className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </ReactModal>
        </div>
    );
};

export default MyBookings;
