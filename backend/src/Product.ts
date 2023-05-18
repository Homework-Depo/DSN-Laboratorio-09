export interface Product {
  id?: number,
  createdAt?: Date
  updatedAt?: Date
  name: string
  brand: string
  model: string
  price: number
  stock: number
  image?: {
    id?: number,
    createdAt?: Date
    updatedAt?: Date
    S3ObjectKey: String
    imgUrl: String
  }
}