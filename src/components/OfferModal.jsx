import { useEffect } from "react";
import { Link } from "react-router-dom";


const OfferModal = () => {
    useEffect(() => {
        const modal = document.getElementById("my_modal_3");
        if (modal) {
            modal.showModal();
        }
    }, []);

    return (
        <div>
            {/* Modal */}
            <dialog id="my_modal_3" className="modal">
                <div
                    className="modal-box relative text-white"
                    style={{
                        backgroundImage: `url('https://sealy.com.sg/wp-content/uploads/2023/10/luxury-modern-bedroom-with-comfortable-double-bed-generated-by-ai-1024x585.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "300px", 
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center px-4">
                        {/* Form to allow closing the modal */}
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div>
                            <h3 className="font-bold text-2xl">Special Offers and Promotions</h3>
                            <p className="mt-4 text-lg">
                                Enjoy exclusive deals just for you! Check out our limited-time offers and save big today.
                            </p>
                            <Link to={"/rooms"}> <button className=" font-semibold text-primary-color bg-white px-7 py-3 rounded-xl  border-2 hover:bg-primary-color hover:text-white ">See More</button></Link>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default OfferModal;
