import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext)
    // console.log(user)

    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/rooms'}>Rooms</NavLink></li>
        <li><NavLink to={'/myBookings'}>My Bookings</NavLink></li>
        <li><NavLink to={'/AboutUs'}>About Us</NavLink></li>
        <li><NavLink to={'/ContactUs'}>Contact Us</NavLink></li>

    </>
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl playwrite-font ">
                    <span className="relative flex items-center">
                        <span className="text-4xl font-bold italic text-primary-color leading-none drop-shadow-lg">M</span>
                        <span className="text-xl">odern</span>
                    </span>
                    <span className="ml-2 relative  flex">
                        <span className="text-4xl font-bold italic text-primary-color leading-none drop-shadow-lg ">H</span>
                        <span className="text-xl">otel</span>
                    </span>
                </a>

            </div>
            <div className="flex-none">

                <ul className="menu menu-horizontal px-1 md:flex hidden">
                    {links}
                </ul>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user?.photoURL
                                } />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                        {links}
                        {user ?
                            <li><button onClick={logOut} className="bg-red-500  font-bold ">Logout</button></li>
                            :
                            <li><Link to={'/authenticationPage'} className="bg-green-500  font-bold "><button  >login</button></Link></li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;