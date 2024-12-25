import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../provider/AuthProvider";

const Registration = () => {
    const { createNewUser, setUser, loginUserWithGoogle ,updateProfileInfo} = useContext(AuthContext);
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = new FormData(event.target);
        const name = form.get("name");
        const photo = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");

        // Password validation
        const uppercaseCheck = /[A-Z]/.test(password);
        const lowercaseCheck = /[a-z]/.test(password);
        const lengthCheck = password.length >= 6;

        if (!uppercaseCheck || !lowercaseCheck || !lengthCheck) {
            setPasswordError(
                "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
            );
            return;
        }

        setPasswordError(""); // Clear any previous error

        createNewUser(email, password)
            .then((result) => {
                setUser(result.user);
                updateProfileInfo(name,photo)
                .then(()=>{
                    // don't need to console 
                })
                .catch(error =>console.log(error.message))
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
            });
    };
    // sign in with google
    const handleSigninWithGoogle = () => {
        loginUserWithGoogle()
            .then(result => {
                console.log(result)
                navigate('/')
            })
    }
    return (
        <div className="">
            <div className="max-w-3xl mx-auto md:py-10 py-0 lg:py-16 rounded-xl">
                <h2 className="font-semibold text-2xl md:text-4xl text-center">
                    Register your account
                </h2>
                <div className="divider"></div>
                <form className="space-y-7 p-5" onSubmit={handleSubmit}>
                    {/* Name input field */}
                    <div className="name">
                        <label className="label">
                            <span className="label-text font-semibold text-xl text-primary-color">
                                Name
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="px-5 outline-primary-color border-2 py-5 bg-white w-full rounded-xl"
                            name="name"
                        />
                    </div>
                    {/* Photo URL input field */}
                    <div className="photo-url">
                        <label className="label">
                            <span className="label-text font-semibold text-xl text-primary-color">
                                Photo-URL
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your photo link"
                            className="px-5 outline-primary-color border-2 py-5 bg-white w-full rounded-xl"
                            name="photo"
                        />
                    </div>
                    {/* Email input field */}
                    <div className="email">
                        <label className="label">
                            <span className="label-text font-semibold text-xl text-primary-color">
                                Email
                            </span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="px-5 outline-primary-color border-2 py-5 bg-white w-full rounded-xl"
                            name="email"
                            required
                        />
                    </div>
                    {/* Password input field */}
                    <div className="password">
                        <label className="label">
                            <span className="label-text font-semibold text-xl text-primary-color">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="px-5 outline-primary-color border-2 py-5 bg-white w-full rounded-xl"
                            name="password"
                            required
                        />
                        {passwordError && (
                            <p className="text-red-500 mt-2">{passwordError}</p>
                        )}
                    </div>
                    {/* Submit button */}
                    <button
                        type="submit"
                        className="font-semibold text-xl py-4 w-full bg-primary-color hover:bg-secondary-color rounded-xl text-white  px-3 sm:px-5 py  "
                    >
                        Register
                    </button>
                </form>
                <p className="font-semibold mt-7 text-center">
                    Already Have An Account?{" "}
                    <Link to={"/authentication"} className="text-red-500 link-hover">
                        Login
                    </Link>
                </p>
                <div className="divider">OR</div>
                <div className="">
                    <button onClick={handleSigninWithGoogle} className="btn text-white font-bold text-lg bg-primary-color hover:bg-secondary-color   px-3 sm:px-5 py-2 rounded-xl  "><FcGoogle className="text-3xl"></FcGoogle> Sign in with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Registration;
