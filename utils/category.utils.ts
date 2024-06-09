import { Category, Product } from "@/types/Products"

export const getUniqueCategories = (data: Product[]): Category[] => {
  const categories = (data || [])?.map((product: Product) => ({ id: product.brandName, title: product.brandName }))
  const uniqueCategories = [...new Map(categories.map((category: Category) => [category.id, category])).values()]
  return uniqueCategories
}