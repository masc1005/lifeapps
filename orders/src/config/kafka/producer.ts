import { kafka } from '.'

export class KafkaProducer {
  sendMessage = async (topic: string, data: any) => {
    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
      topic,
      messages: [
        { value: JSON.stringify(data) }
      ]
    })

    await producer.disconnect()
  }
}