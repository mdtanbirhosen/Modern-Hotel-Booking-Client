import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"

function App() {

  return (
    <>
    <NavBar></NavBar>
    <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default App
