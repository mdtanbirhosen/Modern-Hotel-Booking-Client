import { useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Swal from 'sweetalert2'

const ContactUs = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_bvl5z7u",
        "template_h8b5oij",   // Replace with your EmailJS Template ID
        form.current,
        "uP4xgqD8qjC2hEXEA" // Replace with your Public Key from EmailJS
      )
      .then(
        (result) => {
          console.log("Message sent:", result.text);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Message sent successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          e.target.reset(); // Reset the form after submission
        },
        (error) => {
          console.error("Error:", error.text);
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Failed to send message. Please try again later.",
            showConfirmButton: false,
            timer: 1500
          });
          alert("");
        }
      );
  };

  return (
    <motion.div
      className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-6 text-center text-primary-color"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h1>
        <p className="text-lg mb-4 leading-7 text-center">
          Have questions, feedback, or need assistance? Wed love to hear from you! Reach out to us through any of the options below, and we will get back to you as soon as possible.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Contact Form */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-primary-color">
              Send Us a Message
            </h2>
            <form ref={form} onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  placeholder="Enter your name"
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  id="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-600"
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Enter your message"
                  className="textarea textarea-bordered w-full mt-1"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button className="btn btn-primary w-full">Send Message</button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-primary-color">
              Contact Information
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="w-8 h-8 bg-primary-color text-white rounded-full flex items-center justify-center mr-3">
                  📍
                </span>
                <span> Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center">
                <span className="w-8 h-8 bg-primary-color text-white rounded-full flex items-center justify-center mr-3">
                  📧
                </span>
                <span>mdtanbirhosen912@gmail.com</span>
              </li>
              <li className="flex items-center">
                <span className="w-8 h-8 bg-primary-color text-white rounded-full flex items-center justify-center mr-3">
                  📞
                </span>
                <span>+8801888156886</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactUs;
