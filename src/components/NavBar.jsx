import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const NavBar = () => {
    const {user,logOut} = useContext(AuthContext)
    console.log(user)
    
    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/rooms'}>Rooms</NavLink></li>
        <li><NavLink to={'/myBookings'}>My Bookings</NavLink></li>

    </>
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Modern Hotel</a>
            </div>
            <div className="flex-none">

                    <ul className="menu menu-horizontal px-1">
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                        {user? 
                        <li><button onClick={logOut} className="bg-red-500  font-bold ">Logout</button></li>
                        :
                        <li><Link to={'/authenticationPage'} className="bg-red-500  font-bold "><button  >login</button></Link></li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;