import AllReview from "../components/AllReview";
import FeaturedRooms from "../components/FeaturedRooms";
import MapContent from "../components/MapContent";
import OfferModal from "../components/OfferModal";
import OurCommitment from "../components/OurCommitment";
import OurProduct from "../components/OurProduct";

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
            <OurCommitment></OurCommitment>
            <OurProduct></OurProduct>




            {/* offer modal */}
            <OfferModal></OfferModal>
        </div>
    );
};

export default Homepage;