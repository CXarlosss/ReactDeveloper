import { z } from "zod";
import { CategoriesAPIResponseSchema, RecipeSchema, DrinkAPIResponse, DrinksAPIResponse, SearchRecipeSchema } from "../utils/recipes-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchRecipe = z.infer<typeof SearchRecipeSchema>
export type Drink = z.infer<typeof DrinkAPIResponse>
export type Drinks = z.infer<typeof DrinksAPIResponse>
export type Recipe = z.infer<typeof RecipeSchema>

export type ActiveRecipe = Recipe & {
  [K in `strIngredient${number}` | `strMeasure${number}`]: string | null;
}