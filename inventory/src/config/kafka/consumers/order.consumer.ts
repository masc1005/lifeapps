import { KafkaConsumer } from '../consumers'
import { ProductRepository } from '../../../repository/product.repository'

type OrderData = {
  find: {
    id: string,
    status: "APPROVED" | "CANCELED"
    total: number
    costumer_id: number,
    products: object[]
  },
  data: {
    status: "APPROVED" | "CANCELED"
  }
}

const reciveMessage = async () => {
  const repository = new ProductRepository()

  const consumer = await KafkaConsumer("UPDATE_ORDER")
  consumer.run({
    eachMessage: async ({ message }) => {
      const convertedMessage: OrderData = JSON.parse(message.value.toString())

      if (convertedMessage.data.status === "APPROVED") {
        for (let item of convertedMessage.find.products) {
          await repository.subProduct(item["id"], item["quantity"])
        }
      }

      if (convertedMessage.data.status === "CANCELED") {
        for (let item of convertedMessage.find.products) {
          await repository.addProduct(item["id"], item["quantity"])
        }
      }
    }
  })
}

reciveMessage()