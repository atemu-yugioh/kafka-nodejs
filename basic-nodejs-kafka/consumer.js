const { Kafka, logLevel } = require("kafkajs");

const consumerService = async () => {
  const kafka = new Kafka({
    clientId: "my-local-kafka",
    brokers: ["localhost:9092"],
    logLevel: logLevel.NOTHING,
  });
  try {
    const consumer = kafka.consumer({ groupId: "test-group-consumer" });

    // consumer connect
    await consumer.connect();

    // subscribe to topic
    await consumer.subscribe({
      topic: "wikimedia.recentchange",
      fromBeginning: true,
    });

    // listen message
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        });
      },
    });
  } catch (error) {
    console.log(error);
  }
};

consumerService().catch((error) => console.log(error));
