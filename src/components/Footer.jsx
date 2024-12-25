import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-3">

                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-white">About Us</h2>
                        <p className="text-sm">
                            Discover luxury and comfort at our hotel. Book your stay with us and experience a memorable journey.
                        </p>
                    </div>

                    {/* Navigation Section */}
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-white">Quick Links</h2>
                        <ul>
                            <li className="mb-2">
                                <Link to="/" className="hover:text-white">Home</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/rooms" className="hover:text-white">Rooms</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/my-bookings" className="hover:text-white">My Bookings</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contact" className="hover:text-white">Contact Us</Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-white">About Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social Section */}
                    <div>
                        <h2 className="text-lg font-bold mb-4 text-white">Get In Touch</h2>
                        <p className="text-sm mb-4">
                            Address: 123 Luxury Lane, Paradise City<br />
                            Email: <a href="mailto:info@hotel.com" className="hover:text-white">info@hotel.com</a><br />
                            Phone: +123 456 7890
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-white">
                                <FaFacebook />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-white">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-white">
                                <FaInstagram />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-white">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-4">
                    <p className="text-center text-sm text-gray-400">
                        © {new Date().getFullYear()} Hotel Booking Platform. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
