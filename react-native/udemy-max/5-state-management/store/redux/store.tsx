import { configureStore } from "@reduxjs/toolkit"
import favoritesReducer from "./favorites"

export const store = configureStore({
    // Configure the store with the favorites reducer
    // The store can have multiple reducers, but here we only have one
    reducer: {
        // The key "favoritesMeals" is used to access the state in components
        // e.g. useSelector((state) => state.favoritesMeals.ids)
        favoritesMeals: favoritesReducer,
    },
})

// This type is used to type the state in components
// e.g. const favMealsList = useSelector((state: RootState) => state.favoritesMeals.ids)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
