import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import { Toaster } from "react-hot-toast"
function App() {

  return (
    <div>
      <Toaster position="top-right"></Toaster>



      <NavBar></NavBar>

      <div className="max-w-7xl mx-auto">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  )
}

export default App
