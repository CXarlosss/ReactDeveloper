import { create} from 'zustand'
import { devtools} from 'zustand/middleware'
import type { RecipesSliceType } from './recipeSlice'
import type {FavoritesSliceType } from './favoritesSlice'
import type {NotificationSliceType } from './notificationSlice'
import { createRecipesSlice } from './recipeSlice'
import {  createFavoritesSlice} from './favoritesSlice'
import {  createNotificationSlice} from './notificationSlice'

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
})))