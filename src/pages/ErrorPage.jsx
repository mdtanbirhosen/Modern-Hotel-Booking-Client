import { Link, useRouteError } from 'react-router-dom';
import { BiErrorCircle } from 'react-icons/bi';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-white text-center p-6">
            <BiErrorCircle className="text-red-500 text-8xl mb-6" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h1>
            <p className="text-lg text-gray-600 mb-8">
                {error?.statusText || error?.message || "We can't find the page you're looking for."}
            </p>
            <Link to="/" className="btn btn-primary btn-wide">
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
