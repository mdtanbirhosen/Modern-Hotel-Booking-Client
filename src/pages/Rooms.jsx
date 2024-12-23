import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Rooms = () => {
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        // Fetch user's bookings from the server
        const fetchBookings = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_baseLink}/rooms`);
                const data = await response.json();
                setRooms(data)
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };
        fetchBookings();
    }, []);
    console.log(rooms)
    return (
        <div>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    rooms.map(room => <Link to={`/roomDetailsPage/${room._id}`} key={room._id}>
                        <div className="card bg-base-100  shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                            <figure>
                                <img
                                    className="object-cover h-[200px] w-full transition-transform duration-300 hover:scale-110"
                                    src={room.image}
                                    alt="Shoes"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {room.name}
                                    {/* <div className="badge badge-secondary">NEW</div> */}
                                </h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">Fashion</div>
                                    <div className="badge badge-outline">Products</div>
                                </div>
                            </div>
                        </div>
                    </Link>)
                }
            </div>
        </div>
    );
};

export default Rooms;