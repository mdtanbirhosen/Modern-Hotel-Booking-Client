import { motion } from "framer-motion";
import { FaDirections, FaSave } from "react-icons/fa";
import { MdShareLocation } from "react-icons/md";
import { BsBoxArrowInRight } from "react-icons/bs";
import { IoShareSocialSharp } from "react-icons/io5";


const MapContent = () => {

    return (
        <div className="md:flex md:gap-5">
            <div className="md:w-1/2 w-full">

                <motion.div
                    className="mt-12 text-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3407.054049292602!2d77.21862458140357!3d28.604732722654024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2c3d83ea011%3A0x719a5e5196b12ee8!2sTaj%20Mahal%2C%20New%20Delhi!5e1!3m2!1sen!2sbd!4v1736572246123!5m2!1sen!2sbd"
                        width="100%"
                        height="300"
                        allowFullScreen=""
                        loading="lazy"
                        className="rounded-lg shadow-lg"
                        title="Hotel Location"
                    ></iframe>
                </motion.div>
            </div>
            <div className="md:w-1/2 w-full">
                <h1 className="font-bold text-2xl">The Taj Mahal Palace Hotel</h1>
                <p className="text-xs ">Building</p>
                <div className="divider"></div>
                <div className="flex justify-between flex-wrap">
                    <div className="flex flex-col items-center">
                        <div className="p-4 rounded-full hover:text-primary-color hover:bg-white cursor-pointer  border-2 bg-primary-color text-white "><FaDirections /></div>
                        <span>
                            Directions
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="p-4 rounded-full hover:text-primary-color hover:bg-white cursor-pointer  border-2 bg-primary-color text-white "><FaSave /></div>
                        <span>
                            Save
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="p-4 rounded-full hover:text-primary-color hover:bg-white cursor-pointer  border-2 bg-primary-color text-white "><MdShareLocation /></div>
                        <span>
                            Nearby
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="p-4 rounded-full hover:text-primary-color hover:bg-white cursor-pointer  border-2 bg-primary-color text-white "><BsBoxArrowInRight className="text-lg" /></div>
                        <span>
                            <span>Send A</span><br /> Photo
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="p-4 rounded-full hover:text-primary-color hover:bg-white cursor-pointer  border-2 bg-primary-color text-white "><IoShareSocialSharp /></div>
                        <span>
                            Share
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MapContent;