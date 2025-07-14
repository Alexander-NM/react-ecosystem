import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from "./pages/Vans/Vans"
import VanDetail from "./pages/Vans/VanDetail"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import HostVans from "./pages/Host/HostVans"
import HostVanDetailLayout from "./components/HostVanDetailLayout"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import HostVanPricing from "./pages/Host/HostVanPricing"
import Reviews from "./pages/Host/Reviews"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"
import NotFound from "./pages/NotFound"
import "./server"
import Login from "./pages/Login"
import AuthRequired from "./pages/Host/AuthRequired"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="vans" element={<Vans />} />
                    <Route path="login" element={<Login />} />
                    <Route path="vans/:id" element={<VanDetail />} />
                    <Route element={<AuthRequired />}>
                        <Route path="host" element={<HostLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="income" element={<Income />} />
                            <Route path="vans" element={<HostVans />} />
                            <Route
                                path="vans/:id"
                                element={<HostVanDetailLayout />}
                            >
                                <Route index element={<HostVanInfo />}></Route>
                                <Route
                                    path="pricing"
                                    element={<HostVanPricing />}
                                ></Route>
                                <Route
                                    path="photos"
                                    element={<HostVanPhotos />}
                                ></Route>
                            </Route>
                            <Route path="reviews" element={<Reviews />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
