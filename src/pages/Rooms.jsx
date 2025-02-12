import { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [sortOrder, setSortOrder] = useState("normal"); // Sorting state
  const [minPrice, setMinPrice] = useState(""); // Minimum price state
  const [maxPrice, setMaxPrice] = useState(""); // Maximum price state

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async (filterParams = {}) => {
    try {
      const { minPrice, maxPrice } = filterParams;
      let url = `${import.meta.env.VITE_baseLink}/rooms`;

      // Add query parameters if filters are provided
      if (minPrice || maxPrice) {
        const query = new URLSearchParams();
        if (minPrice) query.append("minPrice", minPrice);
        if (maxPrice) query.append("maxPrice", maxPrice);
        url += `?${query.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleFilter = () => {
    fetchRooms({ minPrice, maxPrice });
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    fetchRooms(); // Fetch all rooms without filters
  };

  return (
    <div className="p-5">
      {/* Filter Section */}
      <div className="md:flex md:justify-between">
        <div className="flex gap-4 mb-5 items-center flex-col md:flex-row">
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="input input-bordered w-36"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="input input-bordered w-36"
            />
          </div>
          <div className="flex gap-4">
            <button className="btn btn-primary" onClick={handleFilter}>
              Filter
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex gap-5 items-center">
          <p className="text-xl">Sort By</p>
          <div className="dropdown">
            <div tabIndex={0} className="btn btn-primary">
              {sortOrder === "normal" ? "Sort: Normal" :
              sortOrder === "asc" ? "Sort: Ascending" : "Sort: Descending"}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 z-50 rounded-box w-52"
            >
              <li>
                <button onClick={() => setSortOrder("normal")}>Normal</button>
              </li>
              <li>
                <button onClick={() => setSortOrder("asc")}>
                  Rating: Low to High
                </button>
              </li>
              <li>
                <button onClick={() => setSortOrder("desc")}>
                  Rating: High to Low
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Rooms Display */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-1 md:px-0">
        {rooms.length ? (
          [...rooms]
            .sort((a, b) => {
              if (sortOrder === "asc") return a.rating - b.rating;
              if (sortOrder === "desc") return b.rating - a.rating;
              return 0; // No sorting (normal state)
            })
            .map((room) => <RoomCard key={room._id} room={room} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No rooms available in this price range.
          </p>
        )}
      </div>
    </div>
  );
};

export default Rooms;
