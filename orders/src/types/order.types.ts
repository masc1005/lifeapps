export type Order = {
  id?: string
  status: "PENDING" | "APPROVED" | "DENIED" | "CANCELED"
  total: number
  costumer_id: number
  products: object[]
}