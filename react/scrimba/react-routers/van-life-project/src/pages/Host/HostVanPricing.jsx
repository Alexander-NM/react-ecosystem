import { useOutletContext } from "react-router"

export default function HostVanPricing() {
    const { currentVan } = useOutletContext()
    return (
        <h3 className="host-van-price">${currentVan.price}<span>/day</span></h3>
    )
}
