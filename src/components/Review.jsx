import PropTypes from "prop-types";
import Rating from 'react-rating-stars-component';

const Review = ({ review }) => {
    const { username, rating, comment, date } = review || {};

    // Format the date
    const formattedDate = date
        ? new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })
        : 'N/A';

    return (
        <div className="md:flex items-center justify-between md:px-5 border-b">
            {/* Chat Card */}
            <div className="chat chat-start">
                <div className="chat-header">
                    {username}
                    <time className="text-xs opacity-50 ml-2">{formattedDate}</time>
                </div>
                <div className="chat-bubble">{comment}</div>
            </div>

            {/* Rating Section */}
            <div className="flex items-center gap-1">
                <span className="md:hidden flex">Users Rating: </span>
                <Rating
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    value={rating}
                />
            </div>
        </div>
    );
};

Review.propTypes = {
    review: PropTypes.object.isRequired,
};

export default Review;
