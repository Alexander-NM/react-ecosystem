import { useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { loginUser } from "../api"

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState(null)
    const [status, setStatus] = useState("idle")
    const { state } = useLocation()

    let isSubmitting = status === "submitting"
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")
        loginUser(loginFormData)
            .then((data) => {
                navigate(state?.pathname || "/host", { replace: true })
                localStorage.setItem("loggedIn", true)
                setError(null)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => setStatus("idle"))
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="login-container">
            {state?.message && <p className="login-first">{state.message}</p>}
            <h1>Sign in to your account</h1>
            {error && (
                <h2 className="cred-issue" aria-live="assertive">
                    There was an error: {error.message}
                </h2>
            )}
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="emial"
                    placeholder="Email address"
                    name="email"
                    onChange={handleChange}
                    value={loginFormData.email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={loginFormData.password}
                />
                <button disabled={isSubmitting}>
                    {isSubmitting ? "Logging in ..." : "Log in"}
                </button>
            </form>
        </div>
    )
}
