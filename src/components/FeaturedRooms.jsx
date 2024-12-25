import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedRooms = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // Fetch rooms from the server
        const fetchRooms = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_baseLink}/rooms`);
                const data = await response.json();

                const topRatedRooms = data
                    .filter((room) => room.rating >= 4.5)
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 6);

                setRooms(topRatedRooms);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, []);

    return (
        <div className="py-10">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Rooms</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-5">
                {rooms.map((room) => (
                    <div key={room._id} className="card bg-base-100 shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        {/* Room Image */}
                        <figure>
                            <img
                                className="object-cover h-[200px] w-full transition-transform duration-300 hover:scale-110"
                                src={room.image}
                                alt={room.name}
                            />
                        </figure>
                        {/* Card Body */}
                        <div className="card-body">
                            <h2 className="card-title text-primary-color">{room.name}</h2>
                            <p className="text-gray-500">{room.description?.slice(0, 100)}...</p>
                            <p>
                                <strong>Price:</strong> ${room.price}
                            </p>
                            <p>
                                <strong>Rating:</strong> {room.rating}/5
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
                            {/* "Book Now" Button */}
                            <div className="mt-4">
                                <Link to={`/roomDetailsPage/${room._id}`}>
                                    <button className="btn btn-primary w-full">Book Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedRooms;
