import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import Banner from "./components/Banner";
import { Helmet } from "react-helmet";

function App() {
  const location = useLocation();
  console.log(location)
  // Define titles based on route paths
  const getTitle = (path) => {
    switch (path) {
      case "/":
        return "Home | Modern Hotel";
      case "/rooms":
        return "Rooms | Modern Hotel";
      case "/myBookings":
        return "My Bookings | Modern Hotel";
      case "/aboutUs":
        return "About Us | Modern Hotel";
      case "/contactUs":
        return "Contact Us | Modern Hotel";
      case "/authenticationPage":
        return "Login | Modern Hotel";
      case "/authenticationPage/registration":
        return "Registration | Modern Hotel";
      default:
        return "Modern Hotel"; // Default title
    }
  };

  return (
    <div className="bg-bg-color">
      <Helmet>
        <title>{getTitle(location.pathname)}</title>
      </Helmet>

      <Toaster position="top-right" />

      <div className="fixed top-0 z-20 w-full ">
        <NavBar />
      </div>

      <div className="mt-20">
        {location.pathname === "/" && <Banner />}

        <div className="max-w-7xl mx-auto min-h-[calc(100vh-200px)] py-5 md:py-10 px-3">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
