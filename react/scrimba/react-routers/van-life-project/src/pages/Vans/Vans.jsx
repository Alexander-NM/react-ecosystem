import React from "react"
import { Link, useSearchParams } from "react-router"
import { getVans } from "../../api"

export default function Vans() {
    const [vans, setVans] = React.useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const typeFilter = searchParams.get("type")?.toLowerCase()

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [])

    const displayedVans = typeFilter
        ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
        : [...vans]

    const vanEls = displayedVans.map((van) => {
        return (
            <div key={van.id} className="van-tile">
                <Link
                    to={van.id}
                    state={{
                        search: `?${searchParams.toString()}`,
                        typeFilter,
                    }}
                    aria-label={`Veiw details for ${van.name} priced at ${van.price} per day`}
                >
                    <img src={van.imageUrl} alt={`Image of ${van.name}`} />
                    <div className="van-info">
                        <p className="van-name">{van.name}</p>
                        <p>
                            {van.price}
                            <span>/day</span>
                        </p>
                    </div>
                    <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                </Link>
            </div>
        )
    })

    if (loading) {
        return <h1 aria-live="assertive">Loading...</h1>
    }

    if (error) {
        return <h1 aria-live="assertive">There was an error: {error.message}</h1>
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button
                    onClick={() => setSearchParams({ type: "simple" })}
                    className={`van-type simple ${
                        typeFilter === "simple" ? "selected" : ""
                    }`}
                >
                    Simple
                </button>
                <button
                    onClick={() => setSearchParams({ type: "luxury" })}
                    className={`van-type luxury ${
                        typeFilter === "luxury" ? "selected" : ""
                    }`}
                >
                    Luxury
                </button>
                <button
                    onClick={() => setSearchParams({ type: "rugged" })}
                    className={`van-type rugged ${
                        typeFilter === "rugged" ? "selected" : ""
                    }`}
                >
                    Rugged
                </button>
                {typeFilter && (
                    <button
                        onClick={() => setSearchParams({})}
                        className="van-type clear-filters"
                    >
                        Clear filters
                    </button>
                )}
                {/* It can be done by Link as well */}
                {/* <Link className="van-type luxury" to="?type=luxury">
                    Luxury
                </Link>
                <Link className="van-type rugged" to="?type=rugged">
                    Rugged
                </Link>
                <Link className="van-type clear-filters" to=".">
                    Clear filters
                </Link> */}
            </div>
            <div className="van-list">{vanEls}</div>
        </div>
    )
}
