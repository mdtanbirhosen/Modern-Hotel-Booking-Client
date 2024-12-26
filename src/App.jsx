import { Outlet, useLocation } from "react-router-dom"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import { Toaster } from "react-hot-toast"
import Banner from "./components/Banner"
function App() {
  const location = useLocation()
  console.log(location)
  return (
    <div className="bg-bg-color">

      <Toaster position="top-right"></Toaster>



      <NavBar></NavBar>
      {
        location.pathname === '/' && <Banner></Banner>
      }
      <div className="max-w-7xl mx-auto min-h-[calc(100vh-200px)]  py-5 
       md:py-10">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  )
}

export default App
