const { Kafka, logLevel } = require("kafkajs");

const kafkaConsumer = async () => {
  // step 1: create kafka client
  const kafka = new Kafka({
    clientId: "basic-kafka",
    brokers: ["localhost:9092"],
    logLevel: logLevel.NOTHING,
  });

  // step 2: create kafka consumer
  const consumer = kafka.consumer({ groupId: "basic-kafka-consumer" });

  try {
    // step 3: consumer connect
    await consumer.connect();

    // step 4: consumer subscribe to topic
    consumer.subscribe({
      topic: "basic-topic",
      fromBeginning: true,
    });

    // step 5: listen message
    await consumer.run({
      eachMessage: async ({ message, partition, topic }) => {
        console.log({
          value: message.value.toString(),
          offset: message.offset,
          timestamp: message.timestamp,
          size: message.size,
        });
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 600000));
  } catch (error) {
    console.log(error);
  } finally {
    consumer.disconnect();
  }
};

kafkaConsumer();
