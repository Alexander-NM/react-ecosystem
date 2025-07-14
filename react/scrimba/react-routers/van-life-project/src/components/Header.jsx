import { Link, NavLink } from "react-router"
import loginImg from "../assets/images/avatar-icon.png"

export default function Header() {

    function fakeLogOut() {
        localStorage.removeItem("loggedIn")
    }

    return (
        <header>
            <Link className="site-logo" to="/">
                #VanLife
            </Link>
            <nav>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                    to="host"
                >
                    Host
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                    to="about"
                >
                    About
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                    to="vans"
                >
                    Vans
                </NavLink>
                <NavLink className="login-link" to="login">
                    <img
                        src={loginImg}
                        alt="avatar icon"
                        className="login-icon"
                    />
                </NavLink>
                <button onClick={fakeLogOut}>X</button>
            </nav>
        </header>
    )
}
