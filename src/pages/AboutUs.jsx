import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Animated Title */}
        <motion.h1
          className="text-5xl font-extrabold mb-8 text-center text-primary-color"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          About Us
        </motion.h1>

        {/* Animated Paragraphs */}
        <motion.div
          className="space-y-6 text-lg leading-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p>
            Welcome to our modern Hotel Booking Platform! We are committed to
            providing a seamless and engaging experience for discovering and
            booking the perfect hotel rooms for your needs. Our platform
            combines interactive design, robust functionality, and secure user
            authentication to ensure an enjoyable and trustworthy service.
          </p>
          <p>
            Our goal is to offer a user-friendly interface that makes the
            booking process as easy and efficient as possible. Whether you are
            planning a vacation, business trip, or weekend getaway, we strive
            to deliver a variety of top-rated options to meet your preferences.
          </p>
          <p>
            At the heart of our mission is customer satisfaction. We
            continuously innovate and enhance our features to provide the best
            experience. With detailed room information, authentic user reviews,
            and secure payment options, you can book with confidence.
          </p>
          <p>
            Thank you for choosing our platform for your travel needs. We look
            forward to making your stay memorable and hassle-free.
          </p>
        </motion.div>

        {/* Animated Image */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/518332246.jpg?k=852d9e83009ac082a7bb8366d5e27fb1f21801ea9cb6dde9c14e1aa99c49ea63&o=&hp=1"
            alt="Hotel representation"
            className="rounded-lg shadow-lg border-4 border-primary-color"
          />
        </motion.div>

        {/* Animated Buttons */}
        <motion.div
          className="flex justify-center gap-6 mt-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Link to={'/'} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
            Learn More
          </Link>
          <Link to='/contactUs' className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300">
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
