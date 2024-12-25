import { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";

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
                    rooms.map(room => <RoomCard key={room._id} room={room}></RoomCard>)
                }
            </div>
        </div>
    );
};

export default Rooms;