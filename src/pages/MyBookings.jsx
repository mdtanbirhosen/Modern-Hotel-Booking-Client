import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const baseURL = import.meta.env.VITE_baseLink; // Base URL from .env file

    useEffect(() => {
        // Fetch user's bookings from the server
        const fetchBookings = async () => {
            try {
                const response = await fetch(`${baseURL}/bookings`);
                const data = await response.json();
                setBookings(data || []); // Default to an empty array if data is null/undefined
            } catch (error) {
                console.error('Error fetching bookings:', error);
                toast.error('Failed to fetch bookings. Please try again.');
            }
        };
        fetchBookings();
    }, [baseURL]);

    const handleCancel = async (id) => {
        const confirm = window.confirm('Are you sure you want to cancel this booking?');
        if (!confirm) return;

        try {
            await fetch(`${baseURL}/bookings/${id}`, {
                method: 'DELETE',
            });
            setBookings((prev) => prev.filter((booking) => booking?._id !== id));
            toast.success('Booking canceled successfully!');
        } catch (error) {
            console.error('Error canceling booking:', error);
            toast.error('Failed to cancel booking.');
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

    const handleReview = async (id) => {
        const rating = prompt('Enter your rating (1-5):');
        const comment = prompt('Enter your review:');
        if (!rating || !comment) return;

        try {
            const response = await fetch(`${baseURL}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId: id,
                    rating: parseInt(rating),
                    comment,
                }),
            });

            if (response?.ok) {
                toast.success('Review added successfully!');
            } else {
                throw new Error('Failed to add review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-6">My Bookings</h1>
            {bookings?.length === 0 ? (
                <p className="text-center text-gray-500">You have no bookings yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full bg-white rounded-lg shadow-md">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Room Name</th>
                                <th>Price</th>
                                <th>Booking Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings?.map((booking, index) => (
                                <tr key={booking?._id} className="hover:bg-gray-100">
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={booking?.image}
                                            alt={booking?.roomName || 'Room'}
                                            className="w-16 h-16 rounded-lg"
                                        />
                                    </td>
                                    <td>{booking?.roomName || 'No Name'}</td>
                                    <td>${booking?.price || 'N/A'}</td>
                                    <td>{booking?.bookingDate || 'Not Specified'}</td>
                                    <td>
                                        <button
                                            onClick={() => handleCancel(booking?._id)}
                                            className="btn btn-error btn-sm mr-2"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleUpdateDate(booking?._id)}
                                            className="btn btn-info btn-sm mr-2"
                                        >
                                            Update Date
                                        </button>
                                        <button
                                            onClick={() => handleReview(booking?._id)}
                                            className="btn btn-success btn-sm"
                                        >
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyBookings;
