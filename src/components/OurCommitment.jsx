import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animation from "../assets/animation2.json"

const OurCommitment = () => {
  return (
    <div className="flex items-center lg:h-[500px] h-[700px] bg-color text-primary-color">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Left side - Text content */}
        <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Commitment to Excellence
          </motion.h2>
          <motion.p
            className="text-lg mb-6"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            We prioritize customer satisfaction by offering exceptional
            services tailored to your needs. Whether its comfort, luxury, or
            personalized service, we go the extra mile for your perfect stay.
          </motion.p>
          <motion.button
            className="bg-[#2C3E50] text-white py-2 px-6 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            Learn More
          </motion.button>
        </div>

        {/* Right side - Animation */}
        <div className="md:w-1/2">
          <Lottie className="h-[400px]" animationData={animation}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default OurCommitment;