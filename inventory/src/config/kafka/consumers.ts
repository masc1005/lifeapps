import { kafka } from '.'

export const KafkaConsumer = async (topic: string) => {
  const consumer = kafka.consumer({ groupId: 'lifeapps' })

  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })

  return consumer
}
