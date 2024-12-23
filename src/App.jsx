import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import { Toaster } from "react-hot-toast"
function App() {

  return (
    <div>
      <Toaster
       position="top-right"></Toaster>
    <NavBar></NavBar>
    <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App
