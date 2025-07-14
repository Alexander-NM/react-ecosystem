import { Outlet, Navigate, useLocation } from "react-router"

export default function AuthRequired() {
    const isLoggedIn = localStorage.getItem("loggedIn")
    const { pathname } = useLocation()

    if (!isLoggedIn) {
        return (
            <Navigate
                to="login"
                state={{ message: "You must login first", pathname }}
                replace
            />
        )
    }

    return <Outlet />
}
