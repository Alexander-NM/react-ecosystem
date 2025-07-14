import { NavigatorScreenParams } from "@react-navigation/native"
import type { CompositeScreenProps } from "@react-navigation/native"
import type { DrawerScreenProps } from "@react-navigation/drawer"
import type { StackScreenProps } from "@react-navigation/stack"

export type CategoriesDrawProps<T extends keyof DrawerParamList> = CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    StackScreenProps<RootStackParamList>
>

export type RootStackParamList = {
    DrawerScreen: NavigatorScreenParams<DrawerParamList>
    // DrawerScreen: undefined
    MealsOverview: { categoryId: string }
    MealDetails: { mealId?: string | undefined }
}
export type DrawerParamList = {
    MealsCategories: undefined
    Favorites: undefined
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
