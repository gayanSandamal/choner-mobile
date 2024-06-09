import { BtnProps } from "./Components"

export type Category = {
  id: string | number
  title: string
}

export type CategoriesStripProps = {
  categories: Category[]
  selectedCategoryId?: string | number | undefined
  onCategoryPress: (category: BtnProps) => void
}

type ProductPrice = {
  amount: string,
  currency: string
}

type ProductSizes = "8" | "9" | "10" | "11"

export type Product = {
  id: string | number
  SKU: number
  name: string
  brandName: string
  mainImage: string
  price: ProductPrice
  sizes: (ProductSizes)[]
  stockStatus: string
  colour: string
  description: string
}

export type CartOptions = {
  uniqueId?: string
  orderId?: number
  product: Product
  selectedSize: string
  qty: number
}

export type CartItem = Product & CartOptions

export type ProductProps = {
  product: Product
  key: string | number
  onPress: (product: Product) => void
}

export type ProductsProps = {
  products: Product[]
  isLoading: boolean
  onPress: (product: Product) => void
}
