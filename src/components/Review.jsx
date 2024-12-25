import PropTypes from "prop-types";

import Rating from 'react-rating-stars-component';
const Review = ({ review }) => {
    const { username, rating, comment, date } = review || {}
    return (
        <div className="md:flex  items-center justify-between md:px-5">
            {/* chat card 
             */}
            <div className="chat chat-start">
                <div className="chat-header">
                    {username}
                    <time className="text-xs opacity-50">{date}</time>
                </div>
                <div className="chat-bubble">{comment}</div>
                <div className="chat-footer opacity-50">Seen</div>
            </div>
            
            {/* rating section  */}
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
    review: PropTypes.object.isRequired
}
export default Review;