import { useParams, Link, useLocation } from "react-router"
import { useEffect, useState } from "react"
import { getVan } from "../../api"

export default function VanDetail() {
    const [van, setVan] = useState(null)
    const { id } = useParams()
    const { state } = useLocation()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVan(id)
                setVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [id])

    if (loading) {
        return <h1 aria-live="assertive">Loading...</h1>
    }

    if (error) {
        return (
            <h1 aria-live="assertive">There was an error: {error.message}</h1>
        )
    }

    return (
        <div className="van-detail-container">
            <Link
                to={`..${state?.search || ""}`}
                relative="path"
                className="back-button"
            >
                &larr;{" "}
                <span>{`Back to ${state?.typeFilter || "all"} vans`}</span>
            </Link>
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} alt={`Image of ${van.name}`} />
                    <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                    <h2>{van.name}</h2>
                    <p className="van-price">
                        <span>${van.price}</span>/day
                    </p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    )
}
