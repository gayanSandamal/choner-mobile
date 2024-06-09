import { getUniqueCategories } from "@/utils/category.utils"

describe("getUniqueCategories", () => {
  it("should return an empty array if no products are provided", () => {
    const result = getUniqueCategories([])
    expect(result).toEqual([])
  })

  it("should return an array of unique categories", () => {
    const products = [
      { brandName: "Nike" },
      { brandName: "Adidas" },
      { brandName: "Nike" },
      { brandName: "Puma" },
      { brandName: "Adidas" },
    ]
    const result = getUniqueCategories(products)
    expect(result).toEqual([
      { id: "Nike", title: "Nike" },
      { id: "Adidas", title: "Adidas" },
      { id: "Puma", title: "Puma" },
    ])
  })
})