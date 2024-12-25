
import AllReview from "../components/AllReview";
import FeaturedRooms from "../components/FeaturedRooms";
import MapContent from "../components/MapContent";

const Homepage = () => {
    return (
        <div>
            
            <section>
                <MapContent></MapContent>
            </section>
            <section>
                <FeaturedRooms></FeaturedRooms>
            </section>

            <section>
                <AllReview></AllReview>
            </section>
            {/* two extra sections here */}



        </div>
    );
};

export default Homepage;