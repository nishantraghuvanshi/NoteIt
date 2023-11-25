import Header from "./Components/header"
import { Outlet } from "react-router-dom"
import Footer from "./Components/footer"

export default function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}