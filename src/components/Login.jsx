import { useContext } from "react";
import { Link, useLocation, useNavigate,  } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2'
const Login = () => {
    const { loginUser, loginUserWithGoogle } = useContext(AuthContext)
    
    const location = useLocation()
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value

        loginUser(email, password)
            .then(result => {
                console.log(result)
                form.email.value = ''
                form.password.value = ''
                navigate(location?.state ? location.state : '/')

            })
            .catch(error => {
                console.log(error)

            })
    }
    // sign in with google
    const handleSigninWithGoogle = () => {
        loginUserWithGoogle()
            .then(result => {
                console.log(result)
                Swal.fire({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success"
                  });
                navigate(location?.state ? location.state : '/')
            })
    }
    return (
        <div className=" text-center">
            <div className="  mx-auto md:py-10 py-0  lg:py-16 rounded-xl">
                <h2 className="font-semibold text-2xl md:text-4xl text-center">Login your account</h2>
                <div className="divider"></div>
                <form action="" className="space-y-7 p-5" onSubmit={handleSubmit}>
                    {/* email input field */}
                    <div className="">
                        <label className="label">
                            <span className="label-text font-semibold text-xl text-primary-color">Email address</span>
                        </label>
                        <input type="email"
                            placeholder="Enter your email address"
                            className="px-5 outline-primary-color border-2 py-5 bg-white w-full rounded-xl"
                            name='email'
                            
                            required />
                    </div>
                    {/* password input field */}
                    <div className="">
                        <label className="label">
                            <span className="label-text font-semibold text-xl text-primary-color">Password</span>
                        </label>
                        <input type="password"
                            placeholder="Enter your password"
                            className="px-5 outline-primary-color border-2 py-5 bg-white w-full rounded-xl"
                            name='password'

                            required />
                    </div>
                    <div className="password-forget">
                        <div className=" text-left text-lg">
                            <Link  className="font-semibold link-hover">Forgotten Password ?</Link>
                        </div>
                    </div>
                    <button type="submit" className="font-semibold text-xl py-4 w-full bg-primary-color hover:bg-secondary-color rounded-xl text-white  px-3 sm:px-5  hover:bg-black">Login</button>
                </form>
                <p className="font-semibold mt-7 text-center">Don’t Have An Account ? <Link to={'/authentication/register'} className="text-red-500 link-hover">Register</Link></p>
                <div className="divider">OR</div>
                <div className="">
                    <button onClick={handleSigninWithGoogle} className="btn text-white font-bold text-lg bg-primary-color hover:bg-secondary-color   px-3 sm:px-5 py-2 rounded-xl hover:bg-black"><FcGoogle className="text-3xl"></FcGoogle> Sign in with Google</button>
                </div>
            </div>


        </div>

    );
};

export default Login;