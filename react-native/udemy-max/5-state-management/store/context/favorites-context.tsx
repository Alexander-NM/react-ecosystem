import React, { createContext } from "react"

export const FavoritesContext = createContext<{
    ids: string[]
    addFavorite: (id: string) => void
    removeFavorite: (id: string) => void
}>({
    ids: [],
    addFavorite: () => {},
    removeFavorite: () => {},
})

export default function FavoritesContextProvider({
    children,
}: {
    children: React.ReactNode
}): React.JSX.Element {
    const [ids, setIds] = React.useState<string[]>([])

    const addFavorite = (id: string) => {
        setIds((prevIds) => [...prevIds, id])
    }

    const removeFavorite = (id: string) => {
        setIds((prevIds) => prevIds.filter((favId) => favId !== id))
    }

    return (
        <FavoritesContext.Provider value={{ ids, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}
