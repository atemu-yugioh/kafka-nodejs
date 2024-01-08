const { Kafka, logLevel } = require("kafkajs");

const producerService = async () => {
  // create kafka
  const kafka = new Kafka({
    clientId: "my-local-kafka",
    brokers: ["localhost:9092"],
    logLevel: logLevel.NOTHING,
  });

  // create producer
  const producer = kafka.producer();
  try {
    // producer connect
    await producer.connect();

    await producer.send({
      topic: "test-topic",
      messages: [{ value: "Hello KafkaJS user!" }],
    });

    console.log("send message success");
  } catch (error) {
    console.error(error);
  } finally {
    producer.disconnect();
  }
};

producerService();
