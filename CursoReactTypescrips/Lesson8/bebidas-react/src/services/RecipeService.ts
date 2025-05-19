import api from "../lib/axios";
import { CategoriesAPIResponseSchema, DrinksAPIResponse } from "../utils/recipes-schema";
import { RecipeSchema } from "../utils/recipes-schema";
import type{ SearchRecipe } from "../types";

export async function getCategories() {
  const url = '/list.php?c=list';
  const { data } = await api(url);
  const result = CategoriesAPIResponseSchema.safeParse(data);
  if (result.success) return result.data;
}

export async function searchRecipes(filters: SearchRecipe) {
  const url = `/filter.php?c=${filters.category}&i=${filters.ingredient}`;
  const { data } = await api(url);
  const result = DrinksAPIResponse.safeParse(data);
  if (result.success) return result.data;
}

export async function getRecipeById(id: SearchRecipe['ingredient']) {
  const url = `/lookup.php?i=${id}`;
  const { data } = await api(url);
  const result = RecipeSchema.safeParse(data.drinks[0]);
  if (result.success) return result.data;
}
