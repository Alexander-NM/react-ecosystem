import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface FavoritesState {
    ids: string[]
}

const initialState: FavoritesState = {
    ids: [],
}

const favoritesSlice = createSlice({
    // part of the action type, e.g. "favorites/addFavorite"
    name: "favorites",
    initialState,
    reducers: {
        // PayloadAction is needed for async actions. Here, we use it for synchronous actions as well.
        addFavorite: (state, action: PayloadAction<{id: string}>) => {
            const mealId = action.payload.id
            if (!state.ids.includes(mealId)) {
                // We can mutate the state directly because of Immer.js
                state.ids.push(mealId)
            }
        },
        removeFavorite: (state, action: PayloadAction<{id: string}>) => {
            // We can mutate the state directly because of Immer.js
            state.ids.splice(state.ids.indexOf(action.payload.id), 1)
        },
    },
})

// Export the actions to be used in components
// e.g. dispatch(addFavorite(mealId))
export const { addFavorite, removeFavorite } = favoritesSlice.actions
// Export the reducer to be used in the store
export default favoritesSlice.reducer
