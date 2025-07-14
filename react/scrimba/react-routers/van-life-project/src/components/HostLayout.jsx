import { Outlet } from "react-router"
import { NavLink } from "react-router"

export default function HostLayout() {
    const style = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
    }

    return (
        <>
            <nav className="host-nav">
                <NavLink
                    style={({ isActive }) => (isActive ? style : null)}
                    to="."
                    end
                >
                    Dashboard
                </NavLink>
                <NavLink
                    style={({ isActive }) => (isActive ? style : null)}
                    to="income"
                >
                    Income
                </NavLink>
                <NavLink
                    style={({ isActive }) => (isActive ? style : null)}
                    to="vans"
                >
                    Vans
                </NavLink>
                <NavLink
                    style={({ isActive }) => (isActive ? style : null)}
                    to="reviews"
                >
                    Reviews
                </NavLink>
            </nav>
            <Outlet />
        </>
    )
}
